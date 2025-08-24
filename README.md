# Psychology Survey (MERN Stack)

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for collecting survey responses on demographics (age, gender, occupation) and mental health factors.  
The system includes user authentication, an admin panel, and analytics to monitor and visualize responses.

🔗 **Live Demo:** [https://survey-form-167w.onrender.com](https://survey-form-167w.onrender.com)

---

## 📌 Features
- **Survey Form** for demographics and mental health questions
- **User Authentication** (Admin login required for dashboard)
- **Admin Panel** to monitor survey responses
- **Analytics Dashboard** for visualizing collected data
- **Responsive Design** (mobile + desktop)
- **JWT-secured API**
- **MongoDB Atlas** for cloud data storage
- **Redis (Upstash)** for caching and performance

---

## 🛠 Tech Stack
**Frontend:**
- React (Vite)
- React Router
- Tailwind CSS / DaisyUI (if used)
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JSON Web Tokens (JWT)
- Redis (Upstash)

**Other Tools:**
- Render (Deployment)
- npm scripts for build/start automation

---

## 📂 Project Structure
survey-form/
│── backend/ # Node.js + Express API
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
│ ├── middlewares/ # Auth & validation
│ └── server.js # Entry point
│
│── frontend/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── utils/
│ │ └── App.jsx
│ └── package.json
│
└── package.json # Root scripts for build/start

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/HtooMyatDev/survey-form.git
cd survey-form
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
VITE_API_URL=http://localhost:5002/api
MONGO_URI=mongodb+srv://dbUser:dbUserPassword@cluster0.xhszj7z.mongodb.net/surveys_db?retryWrites=true&w=majority&appName=Cluster0
PORT=5002
RUN_SEED=false
JWT_SECRET=your_jwt_secret_here
UPSTASH_REDIS_REST_URL="your_upstash_url"
UPSTASH_REDIS_REST_TOKEN="your_upstash_token"
NODE_ENV=development
4️⃣ Run locally

In two separate terminals:

# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev


Frontend will run on http://localhost:5173 and backend on http://localhost:5002
📦 Build & Start (Production)
# Build frontend and install all deps
npm run build

# Start backend
npm start

📊 API Endpoints
| Method | Endpoint          | Description              | Auth Required |
| ------ | ----------------- | ------------------------ | ------------- |
| GET    | `/api/surveys`    | Get all survey responses | ✅ Admin       |
| POST   | `/api/surveys`    | Submit a survey          | ❌ No          |
| POST   | `/api/auth/login` | Login user               | ❌ No          |
| GET    | `/api/auth/me`    | Get current user profile | ✅ Yes         |

📈 Admin Analytics

The admin dashboard includes:

Total number of survey responses

Demographic breakdown charts
🌍 Deployment

The app is deployed on Render.

Deployment steps:

Push latest changes to main.

Render automatically installs dependencies and builds the frontend.

Render runs npm start to serve the backend.
Mental health trends and statistics

🤝 Contributing

Fork the repo

Create a new branch (feature/new-feature)

Commit your changes

Push to your branch

Create a Pull Request

📜 License

This project is licensed under the ISC License.

---

If you want, I can also make you a **`/docs` folder** with:
- Detailed API request/response examples  
- Database schema diagrams  
- Admin panel usage guide  

Do you want me to prepare that next so your repo looks fully professional?
