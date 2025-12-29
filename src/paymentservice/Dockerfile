# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# Base image
FROM node:20.8.0-alpine@sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096 as base

# Builder stage
FROM base as builder

# تغییر mirror آلپاین به یک mirror قابل دسترس
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

# نصب بسته‌های مورد نیاز
RUN apk update && apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# کپی فایل‌های package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install --only=production

# Final stage
FROM base

# تعریف مسیر کاری
WORKDIR /usr/src/app

# کپی وابستگی‌های نصب شده از مرحله builder
COPY --from=builder /usr/src/app/node_modules ./node_modules

# کپی فایل‌های پروژه به داخل کانتینر
COPY . .

# افزودن متغیر محیطی برای پورت
ENV PORT=50051

# نمایه‌سازی پورت 50051
EXPOSE 50051

# تنظیم ورودی کانتینر
ENTRYPOINT ["node", "index.js"]

