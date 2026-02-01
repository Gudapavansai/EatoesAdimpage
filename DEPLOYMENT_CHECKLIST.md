# 🚀 Deployment Checklist

Complete deployment guide for deploying **Eatoes Admin Dashboard** to production.

---

## ✅ Pre-Deployment Checklist

- [ ] All features are working locally
- [ ] Code is committed and pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] Render account created (can use GitHub login)
- [ ] Netlify account created (can use GitHub login)

---

## 📊 Step 1: Database Setup (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Cluster

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Sign Up** or **Log In**
3. Create a **FREE** M0 cluster:
   - Provider: **AWS** (recommended)
   - Region: Choose closest to your users
   - Cluster Name: `eatoes-cluster` (or any name)
4. Click **Create**

### 1.2 Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
   - Authentication Method: **Password**
   - Username: `eatoes-admin` (or your choice)
   - Password: Generate a secure password (SAVE THIS!)
   - Database User Privileges: **Atlas Admin** or **Read and write to any database**
3. Click **Add User**

### 1.3 Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Choose **Allow Access from Anywhere** (0.0.0.0/0)
   - This is needed for Render to connect
4. Click **Confirm**

### 1.4 Get Connection String

1. Go to **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your credentials
6. Add database name at the end:
   ```
   mongodb+srv://eatoes-admin:yourpassword@cluster0.xxxxx.mongodb.net/eatoes-restaurant?retryWrites=true&w=majority
   ```

**✅ SAVE THIS CONNECTION STRING - YOU'LL NEED IT NEXT!**

---

## 🔧 Step 2: Backend Deployment (Render)

### 2.1 Deploy to Render

1. Go to [render.com](https://render.com)
2. Click **Sign Up** or **Log In** (use GitHub)
3. Click **New +** → **Web Service**
4. Connect your GitHub repository:
   - Search for: `EatoesAdimpage`
   - Click **Connect**

### 2.2 Configure Web Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `eatoes-backend` (or your choice) |
| **Root Directory** | `server` |
| **Environment** | `Node` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |

### 2.3 Add Environment Variables

Click **Advanced** → **Add Environment Variable**:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1.4 |

**Note**: Render automatically sets `PORT`, so you don't need to add it.

### 2.4 Deploy

1. Click **Create Web Service**
2. Wait for deployment (3-5 minutes)
3. Once deployed, you'll see: `https://eatoes-backend.onrender.com` (or similar)
4. **✅ COPY THIS URL - YOU'LL NEED IT FOR FRONTEND!**

### 2.5 Test Backend

Open: `https://your-backend-url.onrender.com/api/menu`

You should see a JSON response with menu items (or empty array).

---

## 🎨 Step 3: Frontend Deployment (Netlify)

### 3.1 Deploy to Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. Click **Sign Up** or **Log In** (use GitHub)
3. Click **Add new site** → **Import an existing project**
4. Choose **Deploy with GitHub**
5. Authorize Netlify and select: `EatoesAdimpage`

### 3.2 Configure Build Settings

| Setting | Value |
|---------|-------|
| **Base directory** | `client` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

### 3.3 Add Environment Variables

**BEFORE clicking Deploy**, go to **Site configuration** → **Environment variables**:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |

**IMPORTANT**: 
- Use your Render backend URL from Step 2.4
- Add `/api` at the end
- Example: `https://eatoes-backend.onrender.com/api`

### 3.4 Deploy Site

1. Click **Deploy site**
2. Wait for build (2-3 minutes)
3. Once deployed, you'll get a URL like: `https://sparkling-cupcake-abc123.netlify.app`

### 3.5 (Optional) Custom Domain

1. Go to **Site configuration** → **Domain management**
2. Click **Add custom domain**
3. Follow instructions to connect your domain

---

## 🧪 Step 4: Final Verification

### Test All Features:

- [ ] Dashboard loads without errors
- [ ] Top Selling Items appear
- [ ] Recent Orders table shows data
- [ ] Can update order status
- [ ] Menu Management page loads
- [ ] Can search menu items
- [ ] Can add/edit/delete menu items
- [ ] Can toggle availability
- [ ] POS page works
- [ ] Can create new orders
- [ ] Check browser console for errors (F12)

### Common Issues:

**Issue**: "Network Error" or "Failed to fetch"
- ✅ **Fix**: Check `VITE_API_URL` in Netlify environment variables
- Make sure it ends with `/api`
- Redeploy frontend after fixing

**Issue**: Backend shows "MongooseError: Invalid connection string"
- ✅ **Fix**: Check `MONGODB_URI` in Render environment variables
- Make sure you replaced `<username>` and `<password>`
- Restart backend service in Render

**Issue**: CORS errors in browser console
- ✅ **Fix**: Backend should have CORS enabled (already configured in your code)
- Make sure Render backend is running

---

## 📝 Deployment URLs Tracker

Fill this in as you complete deployment:

- **MongoDB Atlas Cluster**: `_______________________`
- **Backend (Render)**: `_______________________`
- **Frontend (Netlify)**: `_______________________`

---

## 🔄 Updating Your App

### To update after making changes:

1. Make changes locally
2. Test locally
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
4. **Render**: Auto-deploys on push (if enabled)
5. **Netlify**: Auto-deploys on push (if enabled)

---

## 💡 Tips

- **Free Tier Limits**:
  - **Render Free**: Spins down after 15 min of inactivity (first request may be slow)
  - **MongoDB Atlas Free**: 512 MB storage
  - **Netlify Free**: 100 GB bandwidth/month

- **Keep Backend Alive**: Consider using a service like [cron-job.org](https://cron-job.org) to ping your backend every 10 minutes

- **Monitor**: Check Render and Netlify dashboards for deployment logs

---

**🎉 Congratulations! Your restaurant management app is now live!**
