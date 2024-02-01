# SimplyChat

A chat app developed using MERN stack with single and group chat feature.

## Installation

```bash
# Clone the repository
git clone https://github.com/Sagarsim/simply-chat.git

# Change into the project directory
cd simply-chat

# Install dependencies for the server
npm install

# Change into the frontend directory
cd frontend

# Install dependencies for the client
npm install --legacy-peer-deps
```

## Setup Enviroment Variables (Server)

Create a `.env` file in the root of your project:

```
# MongoDB Connection String
MONGO_URI=your_mongo_db_connection_string

# Port for the Express.js server
PORT=4000

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret
```

## Setup Enviroment Variables (Client)

Create a `.env` file in the root of the frontend directory:

```
# API base URL
REACT_APP_API_BASE_URL=http://localhost:4000

# Cloudinary image upload URL
REACT_APP_CLOUDINARY_IMAGE_UPLOAD_URL=cloudinary_image_upload_url
```

## Start development servers

```bash
# Enter below commant in the root directory to start the backend server
npm start

# Change into the frontend directory
cd frontend

# Start frontend development server
npm start
```
