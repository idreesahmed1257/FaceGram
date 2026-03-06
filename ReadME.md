# FaceGram

A full-stack social application built with the **MERN stack**. This project demonstrates core and advanced concepts across MongoDB, Express.js, React, and Node.js.

---

## Description

FaceGram is a social posting and profile application that covers a wide range of MERN stack concepts—from REST APIs and authentication to real-time features and third-party integrations (e.g. Facebook). It serves as a practical reference for building production-style full-stack apps.

---

## Concepts Used

### **MongoDB**
- **Schemas & Models** — User, Post, Comment, Like, Social
- **Mongoose** — ODM, validation, timestamps
- **References & Virtuals** — Populating users, likes, comments on posts
- **Aggregation Pipeline** — Lookup, match, project, sort, skip, limit for complex queries
- **Pagination** — Skip/limit for post listing

### **Express.js**
- **REST API** — Structured routes for auth, posts, social, webhooks
- **Middleware** — Custom auth (JWT), multer (file upload), error handling
- **Router** — Modular route mounting (`/api` → auth, social, post, webHook)
- **Request validation** — `express-validation` with Joi for login/register
- **Static files** — Serving uploads (e.g. `/uploads`)
- **CORS** — Cross-origin config for frontend
- **Environment variables** — `dotenv` for config and secrets

### **Node.js**
- **HTTP server** — Express app + `http.Server` for Socket.io
- **Modules** — Controllers, services, libs, helpers, config
- **Async flow** — Callbacks and async/await in controllers and DB calls

### **React**
- **Components** — Functional components, presentational vs container (Dump vs index)
- **Hooks** — `useState`, `useEffect`, `useSelector` (Redux)
- **React Router v6** — `BrowserRouter`, `Routes`, `Route`, nested routes, layout routes
- **State management** — Redux (store, reducers, actions) for auth/user
- **Form handling** — React Hook Form with Yup validation
- **UI** — Material-UI (MUI), Emotion, SCSS
- **HTTP client** — Axios for API calls
- **Toasts** — react-hot-toast for notifications

### **Authentication & Security**
- **JWT** — Access tokens, verification in auth middleware
- **Password hashing** — bcryptjs
- **Protected routes** — Private vs public layout routes based on auth state

### **Real-time & Integrations**
- **Socket.io** — Real-time connection (server + client)
- **Webhooks** — Incoming webhook routes for external services
- **Facebook** — React Facebook login, profile/page integration, chat helpers

### **File handling**
- **Multer** — Disk storage, file filter (e.g. image types), size limits
- **Static serving** — Express static for uploaded files

### **General**
- **Environment config** — `.env`, config modules
- **Error handling** — Centralized validation and error responses
- **Project structure** — Separation of routes, controllers, services, models, helpers

---

## How to Run

1. **Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Server runs on port **5000** (default).

2. **Frontend**
   ```bash
   cd Frontend
   npm install
   npm start
   ```
   App runs with HTTPS (e.g. **https://localhost:3000**).

3. **Environment**
   - Add a `.env` in `backend` with required variables (e.g. `JWT_SECRET`, MongoDB URI).

---

## Project Structure

- **`backend/`** — Node + Express API, MongoDB (Mongoose), Socket.io, auth, posts, social, webhooks
- **`Frontend/`** — React app, Redux, React Router, MUI, pages and components

---

## Tech Stack Summary

| Layer    | Technologies                          |
|----------|---------------------------------------|
| Database | MongoDB, Mongoose                     |
| Backend  | Node.js, Express.js                   |
| Frontend | React 18, Redux, React Router v6      |
| Auth     | JWT, bcryptjs                         |
| Real-time| Socket.io                             |
| UI       | Material-UI, SCSS, Emotion            |
| Forms    | React Hook Form, Yup, express-validation (Joi) |
