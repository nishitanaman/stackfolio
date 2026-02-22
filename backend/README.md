# Backend

This folder contains the Express API for Stackfolio.

## Setup

1. Copy `.env` from the template or set environment variables:
   ```
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

Endpoints:
- `POST /api/auth/register`
- `POST /api/auth/login`

More routes for projects, achievements, etc. will go into `routes/`.
