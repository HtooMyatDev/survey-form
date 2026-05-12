# Psychology Survey Platform

A full-stack survey platform for psychology research and data collection. It includes user authentication, survey administration, analytics, and response monitoring.

## Live Demo

[Psychology Survey Form](https://survey-form-delta-pearl.vercel.app/)

## ✨ Features

### User Features
- Secure login for survey participants
- Interactive psychology survey forms
- Responsive UI for desktop and mobile
- Client-side and server-side validation
- Submission confirmation with unique response tracking
- **View Submission page** — Review all submitted responses with formatted display of answers
- Share response links to review answers anytime

### Admin Features
- Admin dashboard with analytics
- Create, edit, reorder, and toggle survey questions
- Review and delete submitted responses
- Filter and inspect response details
- Swagger API documentation

### Technical Features
- JWT authentication
- MongoDB + Mongoose for data storage
- Express server with route validation
- Rate limiting and security headers
- React + Vite frontend with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Chart.js
- lucide-react
- react-hot-toast

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt / bcryptjs
- express-validator
- helmet
- rate limiting with Upstash Redis
- Swagger API docs

## 📁 Project Structure

```
psychology-survey-form/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # DB, env, Swagger, Upstash
│   │   ├── controllers/    # Request handlers
│   │   ├── dtos/           # Data transfer objects
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── models/         # Mongoose schemas
│   │   ├── routers/        # API route definitions
│   │   └── utils/          # app errors, cron jobs, async helpers
│   ├── server.js           # Backend entry point
│   ├── userSeeder.js       # Seed demo/admin users
│   ├── .env                # Local environment variables
│   ├── package.json
│   └── package-lock.json
├── frontend/               # React frontend application
│   ├── public/             # Static assets and HTML template
│   ├── src/                # React application source
│   │   ├── components/     # UI components and pages
│   │   ├── lib/            # Axios and helpers
│   │   ├── pages/          # Page-level components
   │   │   └── utils/          # client-side helpers
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js v14 or higher
- MongoDB locally or MongoDB Atlas
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/HtooMyatDev/psychology-survey-form.git
   cd psychology-survey-form
   ```

2. Install dependencies and build the frontend
   ```bash
   npm run build
   ```

   This root command installs dependencies for both `backend` and `frontend`, then builds the frontend app.

3. Configure backend environment variables

   Create `backend/.env` with the following values:
   ```env
   PORT=5002
   MONGODB_URI=mongodb://localhost:27017/psychology-survey
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start MongoDB

   Ensure MongoDB is running, or point `MONGODB_URI` to Atlas.

### Running the app

- Production mode
  ```bash
  npm start
  ```

- Backend development mode
  ```bash
  cd backend
  npm run dev
  ```

- Frontend development mode
  ```bash
  cd frontend
  npm run dev
  ```

By default, the backend listens on `http://localhost:5002` and the frontend dev server runs on `http://localhost:5173`.

## 🎯 Usage

### For Survey Participants
1. **Take the Survey** — Navigate to the home page and complete the psychology survey questionnaire
2. **Submit Responses** — Click the submit button to record your answers
3. **View Confirmation** — After submission, you'll receive a success page with your unique response ID
4. **Review Your Submission** — Use the View Submission page to review all your answers anytime
   - Click the submission link or navigate to `/view-submission/:id`
   - See all questions paired with your responses
   - View formatted answers (single values or multiple selections)
   - Check the submission timestamp
5. **Share or Archive** — Save the link to your submission for future reference

### For Administrators
1. **Login** — Authenticate using admin credentials on the login page
2. **Access Dashboard** — View survey analytics, response counts, and trends
3. **Manage Questions**
   - Create new survey questions
   - Edit existing questions
   - Reorder questions to change flow
   - Toggle questions on/off to control survey visibility
4. **Review Responses**
   - Browse all submitted responses in a filterable table
   - Click any response to view full submission details
   - Compare responses across participants
5. **Monitor Activity** — Check real-time stats and response trends on the dashboard

## 📄 API Overview

The backend routes are mounted at both `/api` and `/`.

### Health and docs
- `GET /api/health` — backend health check
- `GET /api/ping` — diagnostic ping route
- `GET /api-docs` — Swagger API documentation

### Authentication
- `POST /api/auth/login` — admin login

### Questions
- `GET /api/questions` — get active survey questions
- `GET /api/questions/admin` — get all questions (admin only)
- `GET /api/questions/:id` — get a question by ID
- `POST /api/questions` — create a question (admin only)
- `PUT /api/questions/:id` — update a question (admin only)
- `DELETE /api/questions/:id` — delete a question (admin only)
- `PUT /api/questions/reorder` — reorder questions (admin only)
- `PUT /api/questions/:id/toggle` — toggle a question's active status (admin only)

### Responses
- `POST /api/responses` — submit a survey response
- `GET /api/responses` — list responses (admin only)
- `GET /api/responses/:id` — get response details and view submission content
- `DELETE /api/responses/:id` — delete a response (admin only)

## 📋 View Submission Feature

The **View Submission** page allows survey participants to review their submitted responses anytime using a direct link. After completing the survey, users receive a confirmation page with a unique submission ID. They can:

- **View all answers** formatted with question-and-answer pairs
- **See submission timestamp** (date and time of submission)
- **Identify multiple-choice answers** visually separated as tags
- **Share the link** with others or bookmark for future reference
- **Access via route** — `/view-submission/:responseId` or through <b>(in future)</b> email/success confirmation

This feature enhances transparency and allows participants to verify their contributions to the research study.

## 🔧 Notes

- The backend can serve the built frontend from `frontend/dist` when `NODE_ENV=production` and `VERCEL` is not set.
- Use package-specific scripts in `backend` and `frontend` for development.
- The root `package.json` is mainly for install/build and production start.
