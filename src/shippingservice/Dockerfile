# مرحله 1: builder
FROM golang:1.21.3-alpine AS builder

# تغییر mirror آلپاین
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories \
    && apk update && apk add --no-cache ca-certificates git build-base

# حل مشکل 403 گو
ENV GOPROXY=https://goproxy.cn,direct
ENV GOSUMDB=sum.golang.google.cn

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

ARG SKAFFOLD_GO_GCFLAGS
RUN go build -gcflags="${SKAFFOLD_GO_GCFLAGS}" -o /shippingservice .

# مرحله 2: runtime
FROM alpine:3.18.4

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories \
    && apk update && apk add --no-cache ca-certificates

WORKDIR /src
COPY --from=builder /shippingservice ./shippingservice

ENV APP_PORT=50051
ENV GOTRACEBACK=single

EXPOSE 50051
ENTRYPOINT ["/src/shippingservice"]
