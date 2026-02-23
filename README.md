# Stackfolio ( protfolio)

Stackfolio is a full-stack portfolio platform for students to manage projects, achievements, and profile highlights in one place.

User authentication (register/login)
- Project and achievement management
- Clean frontend built with React + Tailwind CSS
- REST API powered by Express + MongoDB

## Tech Stack
### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication

## 📁 Repository Structure

```text
stackfolio/
├── frontend/   # React client
└── backend/    # Express API
```

## 🚀 Quick Start

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd stackfolio
```

### 2) Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run backend:

```bash
npm run dev
```

### 3) Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🔌 API Endpoints (Current)

- `POST /api/auth/register`
- `POST /api/auth/login`

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Open a pull request

## 📌 Notes

- Keep backend and frontend running in separate terminals during development.
- For app-specific details, see:
  - [`frontend/README.md`](frontend/README.md)
  - [`backend/README.md`](backend/README.md)
