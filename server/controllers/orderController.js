const Order = require('../models/Order');

// @desc    Get all orders with pagination
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const { status } = req.query;
        let query = {};
        if (status) {
            query.status = status;
        }

        const count = await Order.countDocuments(query);
        const orders = await Order.find(query)
            .populate('items.menuItem', 'name price imageUrl')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 });

        res.json({ orders, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.menuItem', 'name price imageUrl');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Public
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ['Pending', 'Preparing', 'Ready', 'Served', 'Delivered', 'Cancelled'];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}` });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new order (helper for testing)
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
    try {
        const { tableNumber, items, totalAmount, customerName } = req.body;

        // Generate simple order number
        const orderNumber = 'ORD-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

        const order = new Order({
            orderNumber,
            tableNumber,
            customerName,
            items,
            totalAmount
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get top sellers
// @route   GET /api/analytics/top-sellers
// @access  Public
const getTopSellers = async (req, res) => {
    try {
        const topSellers = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.menuItem",
                    totalQty: { $sum: "$items.quantity" }
                }
            },
            {
                $lookup: {
                    from: "menuitems",
                    localField: "_id",
                    foreignField: "_id",
                    as: "details"
                }
            },
            { $sort: { totalQty: -1 } },
            { $limit: 5 }
        ]);
        res.json(topSellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    updateOrderStatus,
    createOrder,
    getTopSellers
};
