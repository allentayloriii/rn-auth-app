# Authentication and Messaging API

A Node.js API built with Express and Drizzle ORM that provides user authentication, messaging, and file upload capabilities.

## Features

- User registration and login with JWT authentication
- Password hashing using bcrypt
- File upload for user avatars
- CRUD operations for messages
- PostgreSQL database with Drizzle ORM

## Prerequisites

- Node.js
- PostgreSQL
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a PostgreSQL database named 'zth'

3. Configure environment variables:
Copy `.env.example` to `.env` and update the values:
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/zth
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
```

4. Run database migrations:
```bash
npm run migrate
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user
- POST `/api/users/me/avatar` - Upload user avatar (authenticated)

### Messages
- GET `/api/messages` - Get all messages (authenticated)
- POST `/api/messages` - Create a new message (authenticated)
- PATCH `/api/messages/:id` - Update a message (authenticated, owner only)
- DELETE `/api/messages/:id` - Delete a message (authenticated, owner only)

## Development

- Build the project: `npm run build`
- Start production server: `npm start`
- Generate database migrations: `npm run generate`
- Apply migrations: `npm run migrate`
