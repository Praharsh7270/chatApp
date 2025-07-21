# QuickChat - Fullstack Chat Application

A modern real-time chat application built with React, Vite, TailwindCSS, Socket.io, Express, MongoDB, and Cloudinary.

---

## Features
- Real-time messaging with Socket.io
- User authentication and profile management
- Image upload and sharing (Cloudinary)
- Online/offline user status
- Responsive, modern UI with TailwindCSS

---

## Project Structure

```
chatApp/
├── client/         # React frontend (Vite, TailwindCSS)
├── server/         # Express backend (Socket.io, MongoDB, Cloudinary)
└── README.md       # This file
```

---

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

---

## 1. Clone the Repository
```bash
git clone https://github.com/Praharsh7270/chatApp.git
cd chatApp
```

---

## 2. Install Dependencies

### Install client dependencies:
```bash
cd client
npm install
```

### Install server dependencies:
```bash
cd ../server
npm install
```

---

## 3. Environment Variables

### Server (`server/.env`):
Create a `.env` file in the `server` directory with the following:
```
MongoDBUri=mongodb+srv://<username>:<password>@<cluster-url>
CloudinaryCloudName=your_cloud_name
CloudinaryApiKey=your_api_key
CloudinaryApiSecret=your_api_secret
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Client (`client/.env`):
Create a `.env` file in the `client` directory with the following:
```
VITE_BACKEND_URL=http://localhost:5000
```

---

## 4. Running the App

### Start the backend server:
```bash
cd server
npm run dev
```

### Start the frontend client:
```bash
cd ../client
npm run dev
```

- The client will run on [http://localhost:5173](http://localhost:5173) (default Vite port)
- The server will run on [http://localhost:5000](http://localhost:5000)

---

## 5. Main Libraries Used

### Client
- react
- react-dom
- react-router-dom
- axios
- socket.io-client
- tailwindcss
- react-hot-toast
- vite

### Server
- express
- mongoose
- socket.io
- cloudinary
- dotenv
- cors
- bcryptjs
- jsonwebtoken
- nodemon (dev)

---

## 6. Project Structure Details

### Client
- `src/components/` - Main UI components (ChatContainer, SideBar, RightSideBar)
- `src/Pages/` - Main pages (HomePage, LoginPage, ProfilePage)
- `context/` - React context for Auth and Chat
- `src/assets/` - Images, icons, and static assets
- `src/lib/` - Utility functions

### Server
- `Controllers/` - Route controllers (User, Message)
- `Models/` - Mongoose models (User, Message)
- `Routes/` - Express routes (UserRoutes, MeassageRoutes)
- `Middleware/` - Auth middleware
- `lib/` - DB connection, Cloudinary config, utility functions

---

## 7. Usage
- Register a new user or login
- Edit your profile and upload an avatar
- Start chatting with other users in real time
- Send text and image messages

---

## 8. Troubleshooting
- Ensure MongoDB and Cloudinary credentials are correct in `.env`
- Check both client and server consoles for errors
- For image upload issues, check backend logs for Cloudinary errors

---

