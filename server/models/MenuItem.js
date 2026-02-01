const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
        required: true
    },
    price: { type: Number, required: true },
    description: { type: String },
    ingredients: { type: [String] },
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number },
    imageUrl: { type: String }
}, { timestamps: true });

// Create a text index for searching name
menuItemSchema.index({ name: 'text', description: 'text', ingredients: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);
