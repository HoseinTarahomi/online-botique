# --------------------------
# Builder Stage
# --------------------------
FROM golang:1.21.3-alpine AS builder

# استفاده از mirror داخلی یا چین برای apk
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

# نصب پکیج‌های مورد نیاز برای build
RUN apk update && apk add --no-cache \
    ca-certificates \
    git \
    build-base

# مسیر کار
WORKDIR /src

# استفاده از GOPROXY داخلی/چین برای دانلود ماژول‌ها
ENV GOPROXY=https://goproxy.cn,direct

# کپی فایل‌های dependency و دانلود
COPY go.mod go.sum ./
RUN go mod download

# کپی کل سورس
COPY . .

# کامپایل برنامه
ARG SKAFFOLD_GO_GCFLAGS
RUN go build -gcflags="${SKAFFOLD_GO_GCFLAGS}" -o /go/bin/frontend .

# --------------------------
# Release Stage
# --------------------------
FROM alpine:3.18.4 AS release

# استفاده از mirror داخلی برای apk
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

# نصب حداقل پکیج‌های لازم برای runtime
RUN apk update && apk add --no-cache ca-certificates busybox

# مسیر کار
WORKDIR /src

# کپی باینری و فایل‌های استاتیک/templates از مرحله builder
COPY --from=builder /go/bin/frontend /src/server
COPY ./templates ./templates
COPY ./static ./static

# تنظیم متغیر محیطی برای stack trace
ENV GOTRACEBACK=single

# پورت برنامه
EXPOSE 8080

# اجرای برنامه
ENTRYPOINT ["/src/server"]

