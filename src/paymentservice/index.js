'use strict';

if (process.env.DISABLE_PROFILER) {
  console.log("Profiler disabled.");
} else {
  console.log("Profiler is not used."); // دیگر نیازی به پروفایلر گوگل نیست
  // پروفایلر گوگل حذف شد
  // require('@google-cloud/profiler').start({
  //   serviceContext: {
  //     service: 'paymentservice',
  //     version: '1.0.0'
  //   }
  // });
}

if (process.env.ENABLE_TRACING == "1") {
  console.log("Tracing is not used.");
  // ردیابی نیز حذف شد
  // const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
  // const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
  // const { GrpcInstrumentation } = require('@opentelemetry/instrumentation-grpc');
  // const { registerInstrumentations } = require('@opentelemetry/instrumentation');
  // const { OTLPTraceExporter } = require("@opentelemetry/exporter-otlp-grpc");

  // const provider = new NodeTracerProvider();
  // const collectorUrl = process.env.COLLECTOR_SERVICE_ADDR;

  // provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({ url: collectorUrl })));
  // provider.register();

  // registerInstrumentations({
  //   instrumentations: [new GrpcInstrumentation()]
  // });
} else {
  console.log("Tracing disabled.");
}

const path = require('path');
const HipsterShopServer = require('./server');

const PORT = process.env['PORT'];
const PROTO_PATH = path.join(__dirname, '/proto/');

const server = new HipsterShopServer(PROTO_PATH, PORT);

server.listen();

