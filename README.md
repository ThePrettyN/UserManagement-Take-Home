# User Management System

Full-stack app for managing users with location data.

## What it does

- CRUD operations for users
- Auto-fetches coordinates and timezone from zip codes using OpenWeatherMap
- Backend: Node.js + Express + Firebase
- Frontend: React + TypeScript + Tailwind CSS

## Setup

### Backend
```bash
npm install
```

You'll need:
1. Firebase service account JSON file (rename to `firebase-service-account.json`)
2. OpenWeatherMap API key in `.env` file

```bash
cp env.example .env
# edit .env and add your API key
```

Start server:
```bash
npm start
```

### Frontend
```bash
cd frontend
npm install
cp env.example .env
npm start
```

## API Endpoints

- `GET /users` - list all users
- `GET /users/:id` - get specific user  
- `POST /users` - create user (name + zipCode required)
- `PUT /users/:id` - update user
- `DELETE /users/:id` - delete user

## Features

- Firebase Realtime Database (falls back to memory if not configured)
- Location data from zip codes
- Re-fetches location when zip changes
- Error handling
- CORS enabled

## User Schema
```
{
  id: string,
  name: string, 
  zipCode: string,
  latitude: number,
  longitude: number,
  timezone: number,
  createdAt: string,
  updatedAt: string
}
```

## Tech Stack

**Backend:**
- Node.js/Express
- Firebase Admin SDK
- Axios for HTTP requests

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS
- Axios

## Notes

- Make sure backend is running on port 8080 before starting frontend
- Frontend runs on port 3000
- OpenWeatherMap has rate limits on free tier
