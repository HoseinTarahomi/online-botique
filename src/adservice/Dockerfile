# =========================================
# Stage 1: Build
# =========================================
FROM eclipse-temurin:19 as builder

WORKDIR /app

# افزایش Timeout برای Gradle
ENV GRADLE_OPTS="-Dorg.gradle.internal.http.connectionTimeout=60000 -Dorg.gradle.internal.http.socketTimeout=60000"

# کپی فایل‌های Gradle
COPY ["build.gradle", "gradlew", "./"]
COPY gradle gradle
RUN chmod +x gradlew

# دانلود مخازن و dependency ها
RUN ./gradlew downloadRepos

# کپی کل سورس
COPY . .
RUN chmod +x gradlew

# Build برنامه و نصب
RUN ./gradlew installDist

# =========================================
# Stage 2: Runtime
# =========================================
FROM eclipse-temurin:19-jre

WORKDIR /app

# نصب ابزارهای مورد نیاز
RUN apt-get update && \
    apt-get install -y ca-certificates wget && \
    rm -rf /var/lib/apt/lists/*

# نصب اختیاری Stackdriver Profiler Java agent
RUN mkdir -p /opt/cprof && \
    wget -q -O- https://storage.googleapis.com/cloud-profiler/java/latest/profiler_java_agent.tar.gz \
    | tar xzv -C /opt/cprof

# کپی برنامه ساخته شده از مرحله builder
COPY --from=builder /app .

# باز کردن پورت
EXPOSE 9555

# اجرای برنامه با مسیر و نام صحیح
ENTRYPOINT ["/app/build/install/hipstershop/bin/AdService"]

