# Blog API with JWT Authentication

A RESTful API for managing blog posts with user authentication using JWT tokens and bcrypt password hashing.

## Features

- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- CRUD operations for blog posts
- Authorization (users can only edit/delete their own posts)

## Installation

1. Install dependencies:

npm install


2. Start the server:

npm start


The server will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token

### Blogs
- `GET /api/blogs` - Get all blogs (public)
- `GET /api/blogs/:id` - Get blog by ID (public)
- `POST /api/blogs` - Create new blog (requires auth)
- `PUT /api/blogs/:id` - Update blog (requires auth, author only)
- `DELETE /api/blogs/:id` - Delete blog (requires auth, author only)

## Testing with Postman

### 1. Register User
\`\`\`
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "john",
  "password": "1234"
}
\`\`\`

### 2. Login
\`\`\`
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "1234"
}
\`\`\`

### 3. Create Blog (with token)
\`\`\`
POST http://localhost:3000/api/blogs
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "My First Blog",
  "content": "This is my first post!"
}
\`\`\`

## Security Features

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens expire after 1 hour
- Protected routes require valid JWT token
- Users can only modify their own blog posts
