### 🚀 Backend (Node.js + Express + MongoDB + AWS SES)
```bash 
The backend of DevConnect is built using Node.js, Express.js, MongoDB, and JWT authentication, structured using a clean MVC architecture.
It handles authentication, connection logic, user profiles, email workflows, and secure API endpoints.

🔧 Key Backend Features

🔐 Authentication & Security

    - JWT-based authentication with secure token generation

    - Password encryption using bcrypt

    - Custom authentication middleware to verify login state

    - Protected routes for authorized access only

    - Error handling middleware for consistent API responses

🗂️ Architecture (MVC Pattern)
    -Models → MongoDB schemas using Mongoose

    -Controllers → handle HTTP request logic

    -Services → business logic extraction

    -Routes → clean API routing

    -Middleware → auth check, error handling

    -Utils → reusable helper functions

🧵 Connection Management

    -Send connection request

    -Accept or reject request

    -View pending connection requests

    -View accepted connections

    -Optimized Mongoose queries & indexing

📬 Email Service (AWS SES)

    -Transactional emails 

    -Email verification workflow

    -SES SDK integration with AWS IAM

    -Error fallback and monitoring

🌐 CORS + API Handling

    -Configured CORS middleware with allowed origins

    -JSON parsing with express.json()

    -Cookie parsing for secure token handling

💾 Database (MongoDB + Mongoose)
Collections:

    Users

    ConnectionRequests

Features:

    -Schema validations

    -Unique email constraints

    -Indexes for fast lookup

    -Pre-save hooks 


📁 Backend Project Structure
 
backend/
├── src/
│   ├── config/
│   │   └── database.js                # MongoDB connection setup
│   │
│   ├── middleware/
│   │   └── auth.js                    # JWT auth validation middleware
│   │
│   ├── models/
│   │   ├── connectionRequest.js       # Connection request schema
│   │   └── user.js                    # User schema + validations
│   │
│   ├── routes/
│   │   ├── auth.js                    # Login/Signup routes
│   │   ├── profile.js                 # Profile update/view routes
│   │   └── request.js                 # Send/Accept/Reject routes
│   │
│   ├── utils/
│   │   ├── constants.js               # Constants (API base, configs)
│   │   ├── sendEmail.js               # Email sending function (SES)
│   │   ├── sesClient.js               # AWS SES configuration
│   │   └── validation.js              # Joi/Custom validation utils
│   │
│   └── app.js                         # Express app setup (CORS, routes)
│
├── .env                               # Environment variables (ignored)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md    

🧪 API Testing (Postman)
Used Postman for:

    -Signup

    -Login

    -Profile update

    -Send request

    -Accept/Reject

    -Fetch pending/accepted requests

Features included:

    -Postman Environments

    -Authorization tab for JWT    


☁️ Production Deployment (AWS EC2 + Ubuntu)
Steps Used:

    1.Clone backend repo on Ubuntu EC2

    2.Install Node.js & dependencies

    3.Add environment variables to .env

    4.Use PM2 to run server in production:
        pm2 start server.js
        pm2 save


    5.Configure Nginx reverse proxy

    6.SSL setup (optional future update)

    7.SES IAM credentials added safely on EC2

Included:

    -PM2 auto-start on reboot

    -Logs via pm2 logs

    -Nginx for port forwarding (80 → 3000)   

🚧 Future Backend Enhancements

    -Rate limiting with express-rate-limit

    -Logging with Winston/Morgan

    -Email templates for SES

    -Deployment via Docker + CI/CD     