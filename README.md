# Psychology Survey Platform

A comprehensive full-stack survey platform built with the MERN stack, designed for psychology research and data collection. Features user authentication, admin dashboard, response monitoring, and advanced analytics.

## 🚀 Live Demo

[Live Demo](https://survey-form-167w.onrender.com/)

## ✨ Features

### 👤 User Features
- 🔐 **Secure Authentication** - User registration and login system
- 📝 **Interactive Survey Forms** - Psychology-focused questionnaires
- 📱 **Responsive Design** - Optimized for all devices
- ✅ **Form Validation** - Client and server-side validation
- 💾 **Progress Saving** - Resume surveys later

### 👨‍💼 Admin Features
- 📊 **Admin Dashboard** - Comprehensive overview of survey data
- 👥 **User Management** - Monitor and manage survey participants
- 📈 **Advanced Analytics** - Data visualization and insights
- 📋 **Response Monitoring** - Real-time survey response tracking
- 📤 **Data Export** - Export survey results for analysis
- 🎛️ **Survey Management** - Create, edit, and manage surveys

### 🔧 Technical Features
- 🔒 **JWT Authentication** - Secure token-based authentication
- 🗄️ **MongoDB Integration** - Scalable database solution
- 🎨 **Modern UI/UX** - Clean and intuitive interface
- ⚡ **Performance Optimized** - Fast loading and responsive
- 🔄 **RESTful API** - Well-structured backend endpoints

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface library
- **CSS3/SCSS** - Styling and responsive design
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Chart.js/D3.js** - Data visualization (if applicable)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
PSYCHOLOGY-SURVEY-MERN-APP/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   ├── db.js       # Database connection
│   │   │   └── upstash.js  # Redis configuration
│   │   ├── controllers/    # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── questionController.js
│   │   │   └── responseController.js
│   │   ├── middleware/     # Custom middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── authValidation.js
│   │   │   ├── rateLimiter.js
│   │   │   └── responseValidation.js
│   │   ├── models/         # MongoDB schemas
│   │   │   ├── Question.js
│   │   │   ├── Response.js
│   │   │   └── User.js
│   │   └── routers/        # API routes
│   │       ├── authRoutes.js
│   │       ├── questionRoutes.js
│   │       └── responseRoutes.js
│   ├── server.js           # Express server entry point
│   ├── userSeeder.js       # Database seeder
│   ├── .env                # Environment variables (not committed)
│   ├── .env.example        # Environment template
│   ├── package-lock.json
│   └── package.json
├── frontend/               # React frontend application
│   ├── dist/              # Build output directory
│   ├── node_modules/      # Frontend dependencies
│   ├── public/            # Static assets
│   │   ├── vite.svg
│   │   └── index.html
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── PageNotFound.jsx
│   │   ├── lib/           # Utility libraries
│   │   │   └── axios.js
│   │   ├── pages/         # Page components
│   │   │   ├── AllResponsesPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── QuestionsPage.jsx
│   │   │   ├── ResponseDetailPage.jsx
│   │   │   ├── SuccessPage.jsx
│   │   │   └── SurveyPage.jsx
│   │   ├── index.css      # Global styles
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── .env               # Frontend environment variables
│   ├── index.html         # Main HTML template
│   ├── eslint.config.js   # ESLint configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── vite.config.js     # Vite configuration
│   ├── package-lock.json
│   └── package.json
├── .gitignore             # Git ignore rules
├── package.json           # Root package.json for deployment
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or MongoDB Atlas account)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HtooMyatDev/survey-form.git
   cd survey-form
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run build
   ```
   This will install dependencies for both frontend and backend applications.

3. **Set up environment variables**

   Create `.env` files in the backend directory:
   ```bash
   # backend/.env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/psychology-survey
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use MongoDB Atlas.

5. **Run the application**

   **Development mode (runs both frontend and backend):**
   ```bash
   # In the root directory
   npm run dev
   ```

   **Production mode:**
   ```bash
   npm start
   ```

   The application will be available at:
   - Frontend: `http://localhost:5173` (Vite default port)
   - Backend API: `http://localhost:5002`

## 🎯 Usage

### For Survey Participants
1. Register for a new account or login
2. Complete the psychology survey forms
3. Submit responses and view confirmation

### For Administrators
1. Login with admin credentials
2. Access the admin dashboard
3. Monitor survey responses in real-time
4. View analytics and export data
5. Manage users and surveys

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login with validation

### Questions Management
- `GET /api/questions` - Get all active questions (public)
- `GET /api/questions/admin` - Get all questions (admin only)
- `GET /api/questions/:id` - Get specific question by ID
- `POST /api/questions` - Create new question (admin only)
- `PUT /api/questions/:id` - Update question (admin only)
- `DELETE /api/questions/:id` - Delete question (admin only)
- `PUT /api/questions/reorder` - Reorder questions (admin only)
- `PUT /api/questions/:id/toggle` - Toggle question status (admin only)

### Survey Responses
- `POST /api/responses` - Submit survey response
- `GET /api/responses` - Get filtered responses (admin only)
- `GET /api/responses/:id` - Get specific response by ID (admin only)
- `DELETE /api/responses/:id` - Delete response (admin only)

## 🔧 Environment Variables

Create the following environment variables in your backend `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/psychology-survey

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d

# Optional: Email Configuration (if implementing email features)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## 🚢 Deployment

### Render Deployment (Recommended)
1. Create a Render account
2. Connect your GitHub repository
3. Create a new Web Service
4. Set the build command: `npm run build`
5. Set the start command: `npm start`
6. Add environment variables in Render dashboard:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   RUN_SEED=true
   NODE_ENV=production
   ```
7. Deploy from the main branch

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- List any known issues here
- Feature requests and bug reports are welcome

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Htoo Myat**

- GitHub: [@HtooMyatDev](https://github.com/HtooMyatDev)
- Email: itshtunyk@gmail.com
- LinkedIn: [Htoo Myat Aung](https://www.linkedin.com/in/htoo-myat-aung-609997310)

## 🙏 Acknowledgments

- Psychology research community for survey design insights
- MERN stack community for development resources
- Contributors and testers who helped improve this platform

---

⭐ **Star this repository if you found it helpful!**
