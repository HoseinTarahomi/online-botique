# ---------- builder ----------
FROM golang:1.21.3-alpine AS builder

# بدون mirror، از سرور اصلی Alpine استفاده می‌کنیم
RUN apk update && apk add --no-cache ca-certificates git build-base curl

WORKDIR /src

# Go proxy چین برای سرعت بیشتر، ولی میشه مستقیم هم باشه
ENV GOPROXY=https://goproxy.cn,direct
ENV GOSUMDB=sum.golang.google.cn

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /productcatalogservice .

# ---------- runtime ----------
FROM alpine:3.18.4

RUN apk update && apk add --no-cache ca-certificates

WORKDIR /src

COPY --from=builder /productcatalogservice ./server
COPY products.json ./

ENV GOTRACEBACK=single

EXPOSE 3550
ENTRYPOINT ["/src/server"]
