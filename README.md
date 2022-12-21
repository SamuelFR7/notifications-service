<h1 align="center">
    Notifications
</h1>

<p align="center">
  🔔 A notifications microservice
</p>

# 📌 Contents

* [Technologies](#rocket-technologies) 
* [How to Run](#computer-how-to-run)

# 🚀 Technologies
This project was made using the follow technologies:

* [NestJS](https://nestjs.com)
* [Prisma](https://www.prisma.io)
* [PostgreSQL](https://www.postgresql.org)
* [Typescript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/)

# 💻 How to run

## Prerequisites
- [ ]  Postgresql database local or on a server

## Clone Repository
```bash
git clone https://github.com/SamuelFR7/notifications-service.git
```
## Install Dependencies in backend and frontend
```bash
yarn
```
## Create a .env with .env.example schema and use your info
```bash
touch .env
cp .env.example .env
```
## Run migrations in database
```bash
yarn prisma migrate dev
```
## Run Aplication in backend in frontend
```bash
yarn start
```
Go to http://localhost:3000/ to see the result.
