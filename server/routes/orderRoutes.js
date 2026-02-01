const express = require('express');
const router = express.Router();
const {
    getOrders,
    updateOrderStatus,
    createOrder,
    getTopSellers,
    getOrderById
} = require('../controllers/orderController');

router.route('/').get(getOrders).post(createOrder);
router.route('/:id').get(getOrderById);
router.route('/:id/status').patch(updateOrderStatus);
// Analytics route MUST be defined separately if not under /orders/analytics prefix structure, but here requested as /api/analytics/top-sellers in requirements section 3, 
// BUT in section 5D example it's just a function. 
// I will place it under /api/analytics to be clean or keep it here.
// The instructions say "Create a specific route /api/analytics/top-sellers". 
// Since this file is orderRoutes, I might need a separate analyics route file or just put it in server.js or here if I mount it differently. 
// For now I'll create a separate analytics route or handle it in server.js.
// Actually, I'll export it here and use it in server.js or mount it properly.
// Let's create an analytics route file to be clean.
module.exports = router;
