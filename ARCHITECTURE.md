# JEEVO - Full-Stack Application Architecture

## 🏗️ System Architecture Overview

JEEVO is a comprehensive full-stack healthcare technology platform built with modern web technologies.

### Technology Stack

**Frontend:**
- React 19.2.0 with TypeScript
- Vite (development and build tool)
- Vite API Key integration
- Component-based architecture

**Backend:**
- Node.js with Express.js 4.18.2
- MongoDB 7.0.0 (Atlas)
- JWT Authentication
- bcryptjs for password hashing

**Database:**
- MongoDB Jeevo Cluster
- Connection: mongodb+srv://akurivarun_db_user:***@jeevo.khlnsa8.mongodb.net/?appName=Jeevo

## 📁 Project Structure

```
JEEVO/
├── backend/
│   ├── models/
│   │   ├── User.js                 # User schema with bcrypt hashing
│   │   ├── Patient.js              # Patient data model
│   │   └── Appointment.js          # Appointment scheduling model
│   ├── routes/
│   │   ├── auth.js                 # Authentication routes
│   │   ├── users.js                # User management routes
│   │   └── appointments.js         # Appointment routes
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification
│   │   └── errorHandler.js         # Error handling
│   ├── controllers/
│   │   ├── authController.js       # Auth logic
│   │   └── userController.js       # User operations
│   ├── server.js                   # Express app setup
│   ├── package.json                # Dependencies
│   └── .env                        # Environment variables
├── src/ (Frontend)
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   └── index.tsx
├── public/
├── .env                            # Shared env (MongoDB URI)
├── package.json                    # Frontend dependencies
└── README.md

```

## 🔄 Data Flow

1. **Frontend (React)** → Makes HTTP requests to backend API
2. **Backend (Express)** → Processes requests, validates input
3. **Database (MongoDB)** → Stores and retrieves data
4. **Response** → JSON formatted response back to frontend

## 🔐 Security Features

- Password hashing with bcryptjs (salt rounds: 10)
- JWT token-based authentication
- MongoDB connection with credentials
- CORS enabled for secure cross-origin requests
- Input validation and error handling
- Role-based access control (user, admin, doctor)

## 📝 API Endpoints (To Be Implemented)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /api/health` - Server status

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
npm install
npm run dev
```

## 📊 Database Models

### User Model
- firstName (String, required)
- lastName (String, required)
- email (String, unique, lowercase)
- password (String, hashed with bcrypt)
- role (enum: user, admin, doctor)
- phone (String)
- avatar (String)
- isActive (Boolean, default: true)
- createdAt/updatedAt (Timestamp)

## ⚙️ Environment Variables

```
MONGODB_URI=mongodb+srv://akurivarun_db_user:blyKfcbNNrtxbc47@jeevo.khlnsa8.mongodb.net/?appName=Jeevo
PORT=5000
VITE_API_KEY=AIzaSyCOMfTb3g1DCBkxlRMlyMa5U9cu-ydaLNo
```

## 🔧 Development Workflow

1. Make changes to backend/models or routes
2. Test API endpoints using Postman/Insomnia
3. Update frontend services to call new endpoints
4. Run frontend with `npm run dev`
5. Commit changes with descriptive messages

## 📈 Future Enhancements

- Real-time notifications with Socket.io
- Advanced user authentication (OAuth, 2FA)
- Payment integration
- AI-powered appointment scheduling
- Mobile app (React Native)
- CI/CD pipeline
- Docker containerization

## 🤝 Contributing

Follow the established folder structure and naming conventions. Always test thoroughly before committing.

---

**Last Updated:** December 6, 2025
**Status:** Full-Stack Foundation Ready ✅
