const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const seedData = async () => {
    try {
        await MenuItem.deleteMany({});
        await Order.deleteMany({});

        const menuItems = await MenuItem.insertMany([
            // Fast Food
            {
                name: 'Classic Cheeseburger',
                category: 'Appetizer',
                price: 12.99,
                description: 'Juicy beef patty with cheddar, lettuce, tomato, and house sauce.',
                isAvailable: true,
                ingredients: ['Beef Patty', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Bun'],
                preparationTime: 15,
                imageUrl: '/menu-images/classic_cheeseburger.png' // Burger URL
            },
            {
                name: 'Pepperoni Pizza',
                category: 'Main Course',
                price: 18.50,
                description: 'Classic hand-tossed pizza topped with spicy pepperoni and mozzarella.',
                isAvailable: true,
                ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Pepperoni'],
                preparationTime: 20,
                imageUrl: '/menu-images/pepperoni_pizza.png' // Pizza URL
            },
            {
                name: 'Crispy Fried Chicken',
                category: 'Main Course',
                price: 14.00,
                description: 'Golden brown fried chicken pieces served with coleslaw.',
                isAvailable: true,
                ingredients: ['Chicken', 'Flour', 'Spices', 'Oil'],
                preparationTime: 25,
                imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80' // Fried Chicken
            },

            // Indian
            {
                name: 'Hyderabadi Biryani',
                category: 'Main Course',
                price: 16.99,
                description: 'Aromatic basmati rice cooked with tender chicken and authentic spices.',
                isAvailable: true,
                ingredients: ['Basmati Rice', 'Chicken', 'Yogurt', 'Saffron', 'Spices'],
                preparationTime: 40,
                imageUrl: '/menu-images/hyderabadi_biryani.png' // Biryani
            },
            {
                name: 'Butter Chicken',
                category: 'Main Course',
                price: 15.50,
                description: 'Creamy tomato-based curry with succulent chicken pieces.',
                isAvailable: true,
                ingredients: ['Chicken', 'Tomato Puree', 'Cream', 'Butter', 'Fenugreek'],
                preparationTime: 30,
                imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80' // Butter Chicken
            },
            {
                name: 'Paneer Tikka',
                category: 'Appetizer',
                price: 11.00,
                description: 'Marinated cottage cheese cubes grilled to perfection.',
                isAvailable: true,
                ingredients: ['Paneer', 'Yogurt', 'Spices', 'Bell Peppers'],
                preparationTime: 20,
                imageUrl: 'https://images.unsplash.com/photo-1567188040754-5835e546db44?auto=format&fit=crop&w=800&q=80' // Paneer
            },

            // Continental / Chinese
            {
                name: 'Spaghetti Carbonara',
                category: 'Main Course',
                price: 14.50,
                description: 'Italian pasta dish with egg, cheese, cured pork, and black pepper.',
                isAvailable: true,
                ingredients: ['Spaghetti', 'Eggs', 'Pecorino Romano', 'Guanciale', 'Pepper'],
                preparationTime: 20,
                imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80' // Pasta
            },
            {
                name: 'Hakka Noodles',
                category: 'Main Course',
                price: 10.99,
                description: 'Stir-fried noodles with crunchy vegetables and soy sauce.',
                isAvailable: true,
                ingredients: ['Noodles', 'Soy Sauce', 'Cabbage', 'Carrots', 'Capsicum'],
                preparationTime: 15,
                imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80' // Noodles
            },

            // Desserts
            {
                name: 'Chocolate Cake Slice',
                category: 'Dessert',
                price: 8.99,
                description: 'Decadent multi-layered chocolate cake slice topped with rich ganache.',
                isAvailable: true,
                ingredients: ['Dark Chocolate', 'Cocoa Powder', 'Flour', 'Butter', 'Cream'],
                preparationTime: 15,
                imageUrl: '/menu-images/chocolate_cake.png' // Chocolate Cake
            },
            {
                name: 'Cheesecake',
                category: 'Dessert',
                price: 8.50,
                description: 'Creamy cheesecake with a graham cracker crust and berry topping.',
                isAvailable: true,
                ingredients: ['Cream Cheese', 'Sugar', 'Graham Crackers', 'Berries'],
                preparationTime: 10,
                imageUrl: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=800&q=80' // Cheesecake
            },

            // Beverages
            {
                name: 'Iced Coffee',
                category: 'Beverage',
                price: 4.99,
                description: 'Chilled coffee served over ice with a splash of milk.',
                isAvailable: true,
                ingredients: ['Coffee', 'Milk', 'Ice', 'Sugar'],
                preparationTime: 5,
                imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80' // Coffee
            },
            {
                name: 'Mango Smoothie',
                category: 'Beverage',
                price: 5.99,
                description: 'Thick and creamy smoothie made with fresh mangoes.',
                isAvailable: true,
                ingredients: ['Mango', 'Yogurt', 'Honey', 'Ice'],
                preparationTime: 5,
                imageUrl: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80' // Smoothie
            }
        ]);

        console.log('Menu Items Seeded');

        const generateOrder = (table, items, status, customer) => {
            const orderItems = items.map(i => {
                const item = menuItems[i.idx];
                return {
                    menuItem: item._id,
                    quantity: i.qty,
                    price: item.price
                };
            });
            const total = orderItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);

            return {
                orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
                tableNumber: table,
                customerName: customer,
                items: orderItems,
                totalAmount: Number(total.toFixed(2)),
                status
            };
        };

        const ordersData = [
            generateOrder(1, [{ idx: 0, qty: 1 }, { idx: 11, qty: 2 }], 'Delivered', 'John Doe'),
            generateOrder(3, [{ idx: 3, qty: 1 }, { idx: 5, qty: 1 }], 'Preparing', 'Sarah Smith'),
            generateOrder(2, [{ idx: 1, qty: 1 }], 'Pending', 'Mike Johnson'),
            generateOrder(5, [{ idx: 6, qty: 2 }, { idx: 7, qty: 2 }], 'Ready', 'Emily Davis'),
            generateOrder(4, [{ idx: 0, qty: 3 }], 'Delivered', 'Alex Wilson'),
            generateOrder(6, [{ idx: 3, qty: 2 }, { idx: 9, qty: 1 }], 'Preparing', 'Chris Brown'),
            generateOrder(1, [{ idx: 10, qty: 2 }], 'Delivered', 'Reviewer One'),
            generateOrder(7, [{ idx: 2, qty: 1 }, { idx: 5, qty: 1 }], 'Pending', 'Guest'),
            generateOrder(8, [{ idx: 0, qty: 1 }, { idx: 3, qty: 1 }, { idx: 8, qty: 1 }], 'Ready', 'VIP Client'),
            generateOrder(2, [{ idx: 4, qty: 1 }, { idx: 10, qty: 1 }], 'Delivered', 'Sam'),
        ];

        await Order.insertMany(ordersData);

        console.log('Orders Seeded');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
