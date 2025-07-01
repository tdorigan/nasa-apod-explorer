# 🌌 NASA Explorer

A full-stack web application that allows users to explore NASA's Astronomy Picture of the Day (APOD) and browse Mars Rover surface images by selecting an Earth date. Built with React and Node.js using NASA's public APIs.

## 🚀 Live Demo

- 🔗 Frontend: https://nasa-apod-explorer-green.vercel.app
- 🔗 Backend API (APOD): https://nasa-apod-explorer-o7hp.onrender.com/api/apod
- 🔗 Backend API (Mars): https://nasa-apod-explorer-o7hp.onrender.com/api/mars/photos?earth_date=2015-06-03

## 🛠️ Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: Node.js + Express
- **APIs**: [NASA APOD API](https://api.nasa.gov/) & [Mars Rover Photos API](https://api.nasa.gov/)
- **Deployment**: Vercel (frontend), Render (backend)

## 📂 Folder Structure

- `backend/` – Node.js + Express API server
- `frontend/` – React application
- `README.md` – Project overview

## 🔧 Features

### 🌌 Astronomy Picture of the Day (APOD)

- Date picker to view APOD from any date since 1995
- Displays image or embedded video with title and explanation
- Full-screen view of HD images
- Handles missing media or API errors gracefully

### 📸 Mars Rover Image Viewer

- Choose an Earth date to view raw photos from NASA’s **Curiosity Rover**
- Supports pagination for days with many images
- Click on any image to view it in full-screen mode
- Persists last selected date using localStorage

### 🌓 UI Features

- Light/Dark mode toggle
- Responsive layout for desktop and mobile devices
- Friendly loading states and error messages

## 🧪 Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/tdorigan/nasa-apod-explorer.git
   cd nasa-apod-explorer
   ```

2. **Create a `.env` file** in the `backend/` folder with the following content:

   ```env
   NASA_API_KEY=your_nasa_api_key_here
   ```

3. **Create a `.env` file** in the `frontend/` folder with the following content:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the backend**

   ```bash
   cd backend
   npm install
   npm start
   ```

5. **Start the frontend**

   Open a new terminal and run:

   ```bash
   cd frontend
   npm install
   npm start
   ```

6. Open your browser at:

   ```
   http://localhost:3000
   ```

## 📄 License

This project is licensed under the MIT License.
