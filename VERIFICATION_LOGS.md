# Walkthrough - Scalable REST API & Frontend

I have successfully built the Backend and Frontend for your assignment.

## What's Completed
- **Backend:** Express server with JWT Authentication, Role-based access control, and Product CRUD APIs.
- **Frontend:** React + Vite application with a Premium Dark UI, Dashboard, and Authentication pages.
- **Documentation:** Swagger UI setup and Scalability notes.

## Verification Status
> [!TIP]
> **Verification Successful:** The application is fully functional.

**Note on Database:**
To ensure the application runs immediately without requiring a local MongoDB installation, I have configured it to use an **In-Memory Database** as a fallback.
- **Pros:** Works out of the box. Zero setup.
- **Cons:** Data is lost when the backend server restarts.

If you have a local MongoDB instance running, the app will automatically prefer it over the in-memory version.

### Automated Verification
I have run an automated browser session that successfully:
1. Registered a new user (`testuser2`).
2. Logged in.
3. Created a new product ("In-Memory Product").
4. Verified the product appeared in the dashboard.

## How to Run & Verify Manualy

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```
(It will automatically start the in-memory DB if local Mongo is missing)

**API Docs:** Visit `http://localhost:5000/api-docs` to test endpoints directly.

### 3. Frontend
The frontend is serving at `http://localhost:5173`.
If it's not running, start it with:
```bash
cd frontend
npm run dev
```

### 4. Test Flow
1. Open `http://localhost:5173`.
2. Register a new user.
3. Login and view the Dashboard.
4. (Optional) Use a tool like Postman to create an Admin user or inspect the Database.

## Artifacts Created
- [README.md](file:///d:/6%20Projects/test/README.md) - Project Overview & Setup.
- [Scalability.md](file:///d:/6%20Projects/test/Scalability.md) - Architectural notes.
- [backend/](file:///d:/6%20Projects/test/backend/) - Source code.
- [frontend/](file:///d:/6%20Projects/test/frontend/) - Source code.

## Repository
The code has been successfully pushed to:
**https://github.com/FlazeBlaker/Primetrade.ai.Assignment.git**

