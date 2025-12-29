const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 20;  // تعداد لیسنرها را افزایش می‌دهد

if(process.env.DISABLE_PROFILER) {
  console.log("Profiler disabled.");
} else {
  console.log("Profiler disabled."); // به جای Profiler enabled، اعلام می‌کنیم که Profiler غیرفعال است.
  // کامنت کردن یا حذف کردن کد مربوط به Profiler
  // require('@google-cloud/profiler').start({
  //   serviceContext: {
  //     service: 'currencyservice',
  //     version: '1.0.0'
  //   }
  // });
}

const { GrpcInstrumentation } = require('@opentelemetry/instrumentation-grpc');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
registerInstrumentations({
  instrumentations: [new GrpcInstrumentation()]
});

if(process.env.ENABLE_TRACING == "1") {
  console.log("Tracing enabled.");
  const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
  const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
  const { OTLPTraceExporter } = require("@opentelemetry/exporter-otlp-grpc");

  const provider = new NodeTracerProvider();
  const collectorUrl = process.env.COLLECTOR_SERVICE_ADDR;

  provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({ url: collectorUrl })));
  provider.register();
} else {
  console.log("Tracing disabled.");
}

const path = require('path');
const grpc = require('@grpc/grpc-js');
const pino = require('pino');
const protoLoader = require('@grpc/proto-loader');

const MAIN_PROTO_PATH = path.join(__dirname, './proto/demo.proto');
const HEALTH_PROTO_PATH = path.join(__dirname, './proto/grpc/health/v1/health.proto');

const PORT = process.env.PORT;

const shopProto = _loadProto(MAIN_PROTO_PATH).hipstershop;
const healthProto = _loadProto(HEALTH_PROTO_PATH).grpc.health.v1;

const logger = pino({
  name: 'currencyservice-server',
  messageKey: 'message',
  formatters: {
    level (logLevelString, logLevelNum) {
      return { severity: logLevelString }
    }
  }
});

function _loadProto (path) {
  const packageDefinition = protoLoader.loadSync(
    path,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
  );
  return grpc.loadPackageDefinition(packageDefinition);
}

function _getCurrencyData (callback) {
  const data = require('./data/currency_conversion.json');
  callback(data);
}

function _carry (amount) {
  const fractionSize = Math.pow(10, 9);
  amount.nanos += (amount.units % 1) * fractionSize;
  amount.units = Math.floor(amount.units) + Math.floor(amount.nanos / fractionSize);
  amount.nanos = amount.nanos % fractionSize;
  return amount;
}

function getSupportedCurrencies (call, callback) {
  logger.info('Getting supported currencies...');
  _getCurrencyData((data) => {
    callback(null, {currency_codes: Object.keys(data)});
  });
}

function convert (call, callback) {
  try {
    _getCurrencyData((data) => {
      const request = call.request;

      // Convert: from_currency --> EUR
      const from = request.from;
      const euros = _carry({
        units: from.units / data[from.currency_code],
        nanos: from.nanos / data[from.currency_code]
      });

      euros.nanos = Math.round(euros.nanos);

      // Convert: EUR --> to_currency
      const result = _carry({
        units: euros.units * data[request.to_code],
        nanos: euros.nanos * data[request.to_code]
      });

      result.units = Math.floor(result.units);
      result.nanos = Math.floor(result.nanos);
      result.currency_code = request.to_code;

      logger.info(`conversion request successful`);
      callback(null, result);
    });
  } catch (err) {
    logger.error(`conversion request failed: ${err}`);
    callback(err.message);
  }
}

function check (call, callback) {
  callback(null, { status: 'SERVING' });
}

function main () {
  logger.info(`Starting gRPC server on port ${PORT}...`);
  const server = new grpc.Server();
  server.addService(shopProto.CurrencyService.service, {getSupportedCurrencies, convert});
  server.addService(healthProto.Health.service, {check});

  server.bindAsync(
    `[::]:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    function() {
      logger.info(`CurrencyService gRPC server started on port ${PORT}`);
      server.start();
    },
   );
}

main();

