const express = require('express');
const router = express.Router();
const {
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateAvailability,
    getMenuItemById
} = require('../controllers/menuController');

router.route('/search').get(getMenuItems); // Explicit search route per requirements
router.route('/').get(getMenuItems).post(createMenuItem);
router.route('/:id').get(getMenuItemById).put(updateMenuItem).delete(deleteMenuItem);
router.route('/:id/availability').patch(updateAvailability);

module.exports = router;
