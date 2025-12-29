# ۱. تغییر ایمیج پایه Builder به یک آینه معتبر
FROM docker.arvancloud.ir/library/golang:1.21.3-alpine as builder

# تنظیم mirror برای Alpine (درست انجام دادید)
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk add --no-cache ca-certificates git build-base
WORKDIR /src

ENV GOPROXY=https://goproxy.cn,direct
ENV GO111MODULE=on

COPY go.mod go.sum ./
RUN go mod download

COPY . .

ARG SKAFFOLD_GO_GCFLAGS
RUN go build -gcflags="${SKAFFOLD_GO_GCFLAGS}" -o /checkoutservice .

# ۲. تغییر ایمیج پایه Runtime به یک آینه معتبر
FROM docker.arvancloud.ir/library/alpine:3.18.4

COPY --from=builder /etc/ssl/certs /etc/ssl/certs

WORKDIR /src
COPY --from=builder /checkoutservice /src/checkoutservice

ENV GOTRACEBACK=single

EXPOSE 5050
ENTRYPOINT ["/src/checkoutservice"]
