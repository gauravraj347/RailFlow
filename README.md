# Railway Booking Plateform — Microservices

Production style railway booking backend built with **Node.js microservices** and event-driven architecture.

## Key Features

- Microservices + API Gateway
- Kafka event-driven communication
- Saga pattern for booking & payment
- Redis distributed seat locking
- PostgreSQL + Prisma
- Elasticsearch train search
- JWT + OTP + Google OAuth
- Razorpay payment integration
- Rate limiting, circuit breakers & DLQ
- Docker Compose

## Tech Stack

**Node.js · Express.js · Kafka · PostgreSQL · Prisma · Redis · Elasticsearch · Docker · React**

## Services

`API Gateway` · `User` · `Search` · `Admin` · `Booking` · `Payment` · `Inventory` · `Notification`

## Run

```bash
git clone <repo-url>
cd Back-End

docker compose up -d
npm install
npm run dev