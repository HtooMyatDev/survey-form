# Psychology Survey Platform

A comprehensive full-stack survey platform built with the MERN stack, designed for psychology research and data collection. Features user authentication, admin dashboard, response monitoring, and advanced analytics.

## 🚀 Live Demo

[Live Demo](https://your-deployed-app.com) <!-- Update with your actual deployment URL -->

## 📸 Screenshots

![Survey Form](./screenshots/survey-form.png)
![Admin Dashboard](./screenshots/admin-dashboard.png)
![Analytics Panel](./screenshots/analytics.png)

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
psychology-survey-mern/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main App component
│   └── package.json
├── backend/                 # Node.js/Express backend
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   └── server.js          # Express server
├── package.json           # Root package.json
└── README.md
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
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

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
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Surveys
- `GET /api/surveys` - Get all surveys
- `POST /api/surveys` - Create new survey (admin)
- `PUT /api/surveys/:id` - Update survey (admin)
- `DELETE /api/surveys/:id` - Delete survey (admin)

### Responses
- `GET /api/responses` - Get all responses (admin)
- `POST /api/responses` - Submit survey response
- `GET /api/responses/analytics` - Get analytics data (admin)

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

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect your GitHub repository
4. Deploy from the main branch

### Vercel/Netlify (Frontend) + Heroku (Backend)
1. Deploy backend to Heroku
2. Deploy frontend to Vercel/Netlify
3. Update frontend API base URL to point to your Heroku backend

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
- Email: [your.email@example.com]
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- Psychology research community for survey design insights
- MERN stack community for development resources
- Contributors and testers who helped improve this platform

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/HtooMyatDev/survey-form/issues) page
2. Create a new issue if your problem isn't already listed
3. Contact the author directly

---

⭐ **Star this repository if you found it helpful!**

🔗 **Links:**
- [Report Bug](https://github.com/HtooMyatDev/survey-form/issues)
- [Request Feature](https://github.com/HtooMyatDev/survey-form/issues)
- [Documentation](https://github.com/HtooMyatDev/survey-form/wiki)
