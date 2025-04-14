# 🎓 College Discovery Platform

A responsive and dynamic web application designed to help students search, filter, and discover colleges across India based on streams like Engineering, Management, and more. The platform includes role-based authentication, a personalized dashboard, admin panel, and detailed college profiles.



## 🚀 Features

- 🔐 **User & Admin Authentication**
  - Secure login and registration
  - Admin-only access to college data management

- 🏫 **College Discovery**
  - Filter colleges by location, stream, exam score, and more
  - View detailed college information including eligibility, placements, and images

- 🧑‍💼 **User Dashboard**
  - Dynamic greeting
  - Update personal and academic information
  - View applied/saved colleges

- 📋 **Admin Dashboard**
  - Add, edit, and manage college listings
  - Upload college details with dummy image URLs
  - Control visibility of colleges

- 🔄 **Navigation & UI**
  - Back button on college detail pages
  - Clean, user-friendly interface with responsive design



## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT-based auth
- **Deployment**: Vercel (Frontend), Railway/AWS (Backend + DB)



## ⚙️ Setup & Installation

1. **Clone the repository**
  https://github.com/s-204-cmd/Scholars-spotlight-india.git

## Frontend Setup
cd client
npm install
npm run dev

## Backend Setup
cd server
npm install
npm start

## Database
Import the college_data.sql file into your MySQL server.
Set your database credentials in .env file (backend).

📁 Project Structure
college-discovery-platform/
├── client/                 # React frontend
├── server/                 # Node/Express backend
├── database/college_data.sql
├── README.md
└── .env                    # Environment variables
