


# Learning Management System (LMS)

The Learning Management System (LMS) is a comprehensive, full-stack web application desigacned to facilitate online education and training. It leverages modern web technologies to create a scalable, efficient, and engaging platform for students, educators, and administrators.

---

## 🚀 Features

- **User Registration & Authentication**: Includes support for social logins.
- **Course Management**: Easily create, update, and organize course materials.
- **Real-Time Interactions**: Notifications, Q&A sessions, and discussions.
- **Student Dashboard**: Track progress and access learning materials.
- **Instructor Tools**: Manage content and monitor student performance.
- **Admin Panel**: Manage users, courses, orders, and analytics.
- **Performance Optimization**: Redis caching ensures fast and responsive user experiences.

---

## 📂 Tech Stack

- **Frontend**: React, Next.js (Server-Side Rendering)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Redux Toolkit
- **Caching**: Redis

---

## 🎯 Objectives

- Deliver a secure, user-friendly, and scalable online education platform.
- Facilitate effective knowledge sharing for instructors and learners.
- Enable real-time, interactive learning experiences.
- Provide administrators with powerful tools for system management.

---

## 🌟 Why This Project?

The demand for accessible online education is growing rapidly, yet existing platforms often fall short in delivering a seamless user experience. This LMS addresses these challenges by:

- Utilizing cutting-edge technologies like the MERN stack, Next.js, and Redis.
- Offering features tailored for educators, learners, and administrators.
- Ensuring scalability, security, and usability for all users.

---

## 🛠️ Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+)
- MongoDB
- Redis

### Clone the Repository
```bash
<<<<<<< HEAD
git clone https://github.com/modajlal/Learning-Management-System.git
=======
git clone https://github.com/mohdajlal/Learning-Management-System.git
>>>>>>> 66ee5ee53e6871a9ffb62026197b8aa6717b78db
cd lms-project
```

### Install Dependencies
For both `client` and `server` directories:
```bash
cd client
npm install
cd ../server
npm install
```

### Configure Environment Variables
Create `.env` files in the root directories of `client` and `server` and include the following:

**Server `.env`:**
```
PORT=8000                                             # Port for the backend server
ORIGIN=['http://localhost:3000/']                     # Allowed origins for CORS
NODE_ENV=development                                  # Environment (development/production)
DB_URL=                                               # Database connection string
CLOUD_NAME=                                           # Cloudinary cloud name
CLOUD_API_KEY=                                        # Cloudinary API key
CLOUD_SECRET_KEY=                                     # Cloudinary secret key
REDIS_URL=                                            # Redis connection string

ACTIVATION_SECRET=                                    # Secret for account activation token

ACCESS_TOKEN=                                         # JWT access token secret
REFRESH_TOKEN=                                        # JWT refresh token secret

ACCESS_TOKEN_EXPIRE=5                                 # Access token expiry time in minutes
REFRESH_TOKEN_EXPIRE=7                                # Refresh token expiry time in days

SMTP_HOST=smtp.gmail.com                              # SMTP host for email service
SMTP_PORT=465                                         # SMTP port (default for Gmail)
SMTP_SERVICE=gmail                                    # Email service provider
SMTP_MAIL=                                            # Email ID for SMTP
SMTP_PASSWORD=                                        # Password for SMTP email account
VDOCIPHER_API_SECRET=                                 # VdoCipher API secret for video streaming
STRIPE_PUBLISHABLE_KEY=                               # Stripe publishable key for payments
STRIPE_SECRET_KEY=                                    # Stripe secret key for payments
```

**Client `.env`:**
```
NEXT_PUBLIC_SERVER_URI="http://localhost:8000/api/v1/" # API Base URL for the backend server
GOOGLE_CLIENT_ID=                                     # Google OAuth Client ID
GOOGLE_CLIENT_SECRET=                                 # Google OAuth Client Secret
GITHUB_CLIENT_ID=                                     # GitHub OAuth Client ID
GITHUB_CLIENT_SECRET=                                 # GitHub OAuth Client Secret
SECRET=                                               # A secret string used for session management or JWT signing
```

### Run the Application
**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend client:**
```bash
cd client
npm run dev
```

Access the LMS at: `http://localhost:3000`

---

## 🖥️ Folder Structure

```plaintext
LMS-Project/
├── client/        # Next.js frontend
├── server/        # Express.js backend
├── README.md      # Project documentation
```

---

## 🤝 Contributors

- **Mohd Ajlal** 

Feel free to contribute! Open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
