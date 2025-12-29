FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
WORKDIR /app

COPY cartservice.csproj ./
RUN dotnet restore cartservice.csproj

COPY . .
RUN dotnet publish cartservice.csproj \
    -c Release \
    -o /cartservice \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=builder /cartservice .

EXPOSE 7070

ENV DOTNET_EnableDiagnostics=0 \
    ASPNETCORE_HTTP_PORTS=7070

USER 1000
ENTRYPOINT ["/app/cartservice"]

