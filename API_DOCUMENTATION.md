API_DOCUMENTATION.md# 📚 JEEVO API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. User Registration
**Endpoint:** `POST /api/auth/register`
**Access:** Public
**Description:** Register a new user account

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "confirmPassword": "SecurePassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Email already registered" or "Passwords do not match"
}
```

---

### 2. User Login
**Endpoint:** `POST /api/auth/login`
**Access:** Public
**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### 3. Get Current User
**Endpoint:** `GET /api/auth/me`
**Access:** Protected (Requires JWT)
**Description:** Get the authenticated user's profile

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "+91-9876543210",
    "isActive": true,
    "createdAt": "2025-12-06T19:00:00.000Z",
    "updatedAt": "2025-12-06T19:00:00.000Z"
  }
}
```

---

## 🏥 Health Check Endpoint

### Server Health Status
**Endpoint:** `GET /api/health`
**Access:** Public
**Description:** Check if server and MongoDB are running

**Success Response (200):**
```json
{
  "status": "✅ Server is running",
  "timestamp": "2025-12-06T19:00:00.000Z"
}
```

---

## 🛠️ Error Handling

### Common Error Responses

**Unauthorized (401):**
```json
{
  "success": false,
  "error": "Not authorized to access this route" or "Invalid token"
}
```

**Forbidden (403):**
```json
{
  "success": false,
  "error": "Not authorized for this action"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## 📝 Request/Response Examples

### cURL Examples

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123",
    "confirmPassword": "SecurePassword123"
  }'
```

**Login User:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

**Get Current User:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## 📊 Response Status Codes

| Status Code | Meaning |
|-------------|----------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required/failed |
| 403 | Forbidden - Access denied |
| 500 | Internal Server Error |

---

## 🔐 JWT Token Structure

The JWT token contains the following claims:
```json
{
  "id": "user_id",
  "role": "user" or "admin" or "doctor",
  "iat": 1733514000,
  "exp": 1734118800
}
```

**Token Expiration:** 7 days
**Secret Key:** Configured in environment (default: 'your_jwt_secret_key')

---

## 🚀 Future Endpoints (Planned)

- `POST /api/users` - Create user (admin only)
- `GET /api/users` - List all users (admin only)
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user
- `POST /api/appointments` - Schedule appointment
- `GET /api/appointments` - Get user appointments

---

## 📞 Support

For API issues or questions, please create an issue on GitHub or contact the development team.

---

**Last Updated:** December 6, 2025
**API Version:** v1.0
**Status:** ✅ Active Development
