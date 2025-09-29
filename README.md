# Movie Manager Backend

A RESTful API for managing a movie database built with NestJS, TypeORM, and PostgreSQL.

## Description

This backend service provides endpoints for movie management with user authentication. It allows users to register, login, and perform CRUD operations on movie entries including uploading movie posters.

## Live Deployment

- API Endpoint: [http://13.211.8.154:3001/api](http://13.211.8.154:3001/api)
- Swagger Documentation: [http://13.211.8.154:3001/api](http://13.211.8.154:3001/api)
- Github repo url : 'https://github.com/Priyank-a-a/movie-manager-back-end.git

## Features

- User authentication with JWT
- User registration and login
- CRUD operations for movies
- Movie poster image upload and serving
- API documentation with Swagger
- PostgreSQL database integration

## Installation

```bash
$ npm install
```

## Database Configuration

The application is configured to connect to a PostgreSQL database. Update the database configuration in `src/app.module.ts` if needed.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# seed database with initial data
$ npm run seed
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

Swagger documentation is available at `/api` endpoint. The API provides the following endpoints:

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Movies

- `GET /movies` - Get all movies
- `GET /movies/:id` - Get a specific movie
- `POST /movies` - Create a new movie (requires authentication)
- `PATCH /movies/:id` - Update a movie (requires authentication)
- `DELETE /movies/:id` - Delete a movie (requires authentication)
- `POST /movies/:id/poster` - Upload a movie poster (requires authentication)

## Deployment

The application is deployed on AWS EC2 with a PostgreSQL RDS database.

## Environment Variables

The following environment variables can be configured:

- Database connection parameters
- JWT secret
- CORS settings

## Project Structure

- `src/auth` - Authentication module with user entity and JWT strategy
- `src/movie` - Movie module with CRUD operations
- `src/main.ts` - Application entry point with Swagger setup
- `src/seeder.ts` - Database seeder for initial data

## Technologies Used

- NestJS - A progressive Node.js framework
- TypeORM - ORM for database interactions
- PostgreSQL - Database
- JWT - Authentication
- Swagger - API documentation
- AWS - Deployment (EC2 and RDS)

## License

This project is MIT licensed.
