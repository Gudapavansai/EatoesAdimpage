# Eatoes Admin Dashboard

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Gudapavansai/EatoesAdimpage)

A robust, full-stack restaurant management and administration platform built using the MERN stack (MongoDB, Express, React, Node.js). This application addresses the core needs of a modern restaurant, from menu management to order tracking and point-of-sale operations.

## 🚀 Features

### 📊 Interactive Dashboard
- **Real-time Overview**: View top-selling items and key performance metrics at a glance.
- **Order Management**: Monitor recent orders with a live status workflow.
- **Optimistic UI**: Instant visual feedback for status changes (Pending → Delivered) without page reloads.
- **Detailed Views**: Modal popups for deep-diving into specific order details.

### 🍔 Menu Management
- **Full CRUD Operations**: Add, edit, delete, and view menu items.
- **Search & Filter**: Find items instantly by name or category (Appetizer, Main Course, Dessert, etc.).
- **Availability Control**: One-click toggles to mark items as "In Stock" or "Sold Out".
- **Visuals**: Support for high-quality food images.

### 🖥️ Point of Sale (POS)
- **Streamlined Ordering**: Intuitive interface for staff to create new orders quickly.
- **Cart System**: Dynamic cart with quantity adjustments and real-time total calculation.
- **Table Management**: Assign orders to specific tables.
- **Validation**: Schema-compliant order generation ensuring data integrity.

### 👤 Admin Profile
- View and manage admin details (placeholder for future authentication enhancements).

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide React (Icons), Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Tools**: Postman (Testing), Git (Version Control) Netfiy, Render.

## 📋 Prerequisites

Before running the application, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (Local instance or Atlas connection string)

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Gudapavansai/EatoesAdimpage.git
    cd EatoesAdimpage
    ```

2.  **Server Setup**
    ```bash
    cd server
    npm install
    ```
    - Create a `.env` file in the `server` directory:
      ```env
      PORT=5000
      MONGODB_URI=your_mongodb_connection_string
      ```
    - Seed the database (Optional but recommended):
      ```bash
      npm run seed
      ```
    - Start the server:
      ```bash
      npm run dev
      ```

3.  **Client Setup**
    ```bash
    cd ../client
    npm install
    ```
    - (Optional) Create a `.env` file in `client` if you need a custom API URL:
      ```env
      VITE_API_URL=http://localhost:5000/api
      ```
    - Start the frontend:
      ```bash
      npm run dev
      ```

## 🔌 API Endpoints Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/menu` | Retrieve all menu items (supports query params for search/filter) |
| **POST** | `/api/menu` | Create a new menu item |
| **GET** | `/api/orders` | Fetch recent orders with pagination |
| **POST** | `/api/orders` | Create a new order (POS) |
| **PATCH** | `/api/orders/:id/status` | Update order status (Pending, Ready, etc.) |
| **GET** | `/api/analytics/top-sellers` | Get aggregation data for top-selling items |

### Example Response (Order Object)
```json
{
  "_id": "65b2f...",
  "tableNumber": 5,
  "status": "Served",
  "totalAmount": 45.50,
  "items": [
    {
      "menuItem": { "name": "Classic Burger", "price": 12.00 },
      "quantity": 2,
      "price": 12.00
    }
  ]
}
```

## 🧠 Challenges & Solutions

### 1. Dashboard Status Latency
**Challenge:** Users experienced a delay between changing an order status and seeing the badge update, causing confusion.
**Solution:** Implemented **Optimistic UI Updates**. The interface now updates the status immediately upon user action, assuming success, and silently reverts if the backend call fails. This creates a snappy, responsive experience.

### 2. Handling Legacy Data
**Challenge:** Changing the status of older orders failed because they didn't meet new, stricter schema validation rules (e.g., missing specific field data).
**Solution:** Refactored the backend controller to use `findByIdAndUpdate` instead of `doc.save()`. This allows partial updates (like just changing the status) without triggering full-document validation errors on unrelated legacy fields.

## 📸 Screenshots


