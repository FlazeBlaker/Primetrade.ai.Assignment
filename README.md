# Scalable REST API & Frontend Assignment

**Backend Developer Intern Task**

## Overview
This project consists of a secure, scalable REST API built with Node.js/Express and a modern Frontend UI built with React. It features robust authentication, role-based access control, and CRUD operations for products.

## Features
- **Authentication:** JWT-based auth with password hashing (Bcrypt).
- **Authorization:** Role-Based Access Control (User vs Admin).
- **Security:** Helmet API security, CORS enabled, Input Validation.
- **Frontend:** Premium dark-mode UI with glassmorphism effects.
- **Documentation:** Swagger UI for API testing.

## Tech Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** React, Vite, Vanilla CSS
- **Tools:** Swagger, Axios

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on default port (27017)

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The server will start on `http://localhost:5000`.
Swagger Documentation available at `http://localhost:5000/api-docs`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The client will start on `http://localhost:5173`.

## Testing the App
1. **Register:** Create a new account.
2. **Login:** Log in to access the Dashboard.
3. **Dashboard:**
   - View all products.
   - **User:** Can only view.
   - **Admin:** Can Create, Update, and Delete products.
   - *Note:* Product creation is currently open to verified users for demonstration, but deletion is restricted to Admins or Owners.

## API Endpoints

- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/products` - Get all products
- `POST /api/v1/products` - Create product (Protected)
- `DELETE /api/v1/products/:id` - Delete product (Protected)

## License
MIT
