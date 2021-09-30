FROM golang:1.17.1-alpine AS builder

WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY config.properties ./
COPY main.go ./
COPY src/ src/

RUN go build -o /docker-memory-go-app

# ------------------------
FROM alpine:3.13

COPY --from=builder /docker-memory-go-app .
COPY config.properties .

EXPOSE 8080

CMD /docker-memory-go-app
