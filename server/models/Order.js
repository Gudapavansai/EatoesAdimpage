const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true, required: true },
    tableNumber: { type: Number, required: true },
    customerName: { type: String },
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true }
    }],
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Ready', 'Served', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    totalAmount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
