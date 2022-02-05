# API REST- SISTEMA ORDENES DE CERVECEROS

This is an API REST project bootstrapped with [`NodeJS`](https://nodejs.org/en/), [`Express`](http://expressjs.com/), [`Sequelize`](https://sequelize.org/master/index.html).

## About the API

This is an api for management the orders from customers that want to buy beer, also, this allow to sellers and providers have a better management of their bussiness, lastly, the administrator could management and seeing information about the providers, sellers, costumers and statistics about them like purchases, sales or products.

## Getting Started

To start you can clone this project:

```bash
git clone https://gitlab.com/MarcoAntonioLopezFlores/sistema-cerveceros.git
```

First, create a `.env` file with your secrets:

```bash
cp .env.example .env
```

Also, you need create a `docker-compose.yml` file with your secrets:

```bash
cp docker-compose-example.yml docker-compose.yml
```

Second, run the next command to install the dependencies (You can see the dependencies in the file package.json):

```bash
npm install
```

Third, run the service of docker and execute the next commands:

```bash
docker-compose up -d postgres
docker-compose up -d pgadmin
```

You can verify if the services are running with the next command:

```bash
docker-compose ps
```

In addition, you can open pgadmin [http://localhost:5000](http://localhost:5000) to verify if the database exists

After that, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) with your browser to see the swagger documentation.

## Multer configuration

To save images you need run the next command:

```bash
mkdir -p public/{banner,product}/images
```
