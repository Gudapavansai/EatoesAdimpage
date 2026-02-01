# 🚀 Deployment Guide

This guide describes how to deploy the Eatoes Admin Dashboard to **Render (Backend)** and **Netlify (Frontend)**.

## 1. Backend Deployment (Render)

We will deploy the Node.js/Express server to Render.

1.  **Sign Up/Login**: Go to [render.com](https://render.com/) and log in (e.g., with GitHub).
2.  **Create New Web Service**:
    *   Click the "New +" button and select **Web Service**.
    *   Connect your GitHub repository: `EatoesAdimpage`.
3.  **Configure Settings**:
    *   **Root Directory**: `server` (Important! This tells Render the app is in the server folder).
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
4.  **Environment Variables**:
    *   Scroll down to the "Environment Variables" section.
    *   Add `MONGODB_URI`: Paste your MongoDB Atlas connection string (same as in your local `.env`).
    *   *Note: Render automatically sets the `PORT` variable.*
5.  **Deploy**: Click **Create Web Service**. Wait for the build to finish.
6.  **Copy URL**: Once deployed, copy the "onrender.com" URL provided (e.g., `https://eatoes-api.onrender.com`). You will need this for the frontend.

---

## 2. Frontend Deployment (Netlify)

We will deploy the React/Vite app to Netlify.

1.  **Sign Up/Login**: Go to [netlify.com](https://netlify.com) and log in.
2.  **Add New Site**:
    *   Click **Add new site** > **Import an existing project**.
    *   Select **GitHub**.
    *   Authorize Netlify and choose your repository: `EatoesAdimpage`.
3.  **Configure Build Settings**:
    *   **Base directory**: `client`
    *   **Build command**: `npm run build`
    *   **Publish directory**: `client/dist` (Netlify might auto-detect just `dist`, make sure it points to the output folder inside client).
4.  **Environment Variables**:
    *   Click on **Advanced** or go to **Site configuration > Environment variables** after creation.
    *   Add a new variable:
        *   **Key**: `VITE_API_URL`
        *   **Value**: The Render Backend URL you copied earlier + `/api` (e.g., `https://eatoes-api.onrender.com/api`).
        *   *Important: Make sure to include `/api` at the end if your local setup used it.*
5.  **Deploy**: Click **Deploy site**.

## 3. Final Verification

1.  Open your Netlify URL.
2.  The dashboard should load.
3.  Check the "Dashboard" and "Menu" pages to ensure data is fetching from your deployed backend.
4.  If you see network errors, check the browser console to ensure the API requests are going to `onrender.com` and not `localhost`.
