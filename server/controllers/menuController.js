const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items or search
// @route   GET /api/menu
// @access  Public
const getMenuItems = async (req, res) => {
    try {
        const { q, category, isAvailable, minPrice, maxPrice } = req.query;
        let query = {};

        // Search (Text Indexing)
        if (q) {
            query = { $text: { $search: q } };
        }

        // Filters
        if (category) {
            query.category = category;
        }

        if (isAvailable !== undefined) {
            query.isAvailable = isAvailable === 'true';
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const menuItems = await MenuItem.find(query).sort({ createdAt: -1 });
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Public (should be Protected in real app)
const createMenuItem = async (req, res) => {
    try {
        const { name, category, price, description, isAvailable, ingredients, preparationTime, imageUrl } = req.body;

        // Basic validation
        if (!name || !category || !price) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const menuItem = new MenuItem({
            name,
            category,
            price,
            description,
            isAvailable,
            ingredients,
            preparationTime,
            imageUrl
        });

        const createdItem = await menuItem.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Public
const updateMenuItem = async (req, res) => {
    try {
        const { name, category, price, description, isAvailable, ingredients, preparationTime, imageUrl } = req.body;
        const menuItem = await MenuItem.findById(req.params.id);

        if (menuItem) {
            menuItem.name = name || menuItem.name;
            menuItem.category = category || menuItem.category;
            menuItem.price = price !== undefined ? price : menuItem.price;
            menuItem.description = description || menuItem.description;
            menuItem.isAvailable = isAvailable !== undefined ? isAvailable : menuItem.isAvailable;
            menuItem.ingredients = ingredients || menuItem.ingredients;
            menuItem.preparationTime = preparationTime !== undefined ? preparationTime : menuItem.preparationTime;
            menuItem.imageUrl = imageUrl || menuItem.imageUrl;

            const updatedItem = await menuItem.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Public
const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);

        if (menuItem) {
            await menuItem.deleteOne();
            res.json({ message: 'Menu item removed' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update availability
// @route   PATCH /api/menu/:id/availability
// @access  Public
const updateAvailability = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (menuItem) {
            menuItem.isAvailable = !menuItem.isAvailable;
            const updatedItem = await menuItem.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateAvailability
};
