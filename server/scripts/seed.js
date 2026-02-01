const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const connectDB = require('../config/db');

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://RestaurantAdminDashboard_db_user:RestaurantAdminDashboard@cluster0.lym6kdt.mongodb.net/?appName=Cluster0";
connectDB(MONGO_URI);

const seedData = async () => {
    try {
        await MenuItem.deleteMany({});
        await Order.deleteMany({});

        const menuItemsData = [
            // --- Appetizers (6) ---
            {
                name: 'Classic Cheeseburger',
                category: 'Appetizer',
                price: 12.99,
                description: 'Juicy beef patty with cheddar, lettuce, tomato, and house sauce.',
                isAvailable: true,
                ingredients: ['Beef Patty', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Bun'],
                preparationTime: 15,
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Paneer Tikka',
                category: 'Appetizer',
                price: 11.00,
                description: 'Marinated cottage cheese cubes grilled to perfection.',
                isAvailable: true,
                ingredients: ['Paneer', 'Yogurt', 'Spices', 'Bell Peppers'],
                preparationTime: 20,
                imageUrl: 'https://images.unsplash.com/photo-1567188040754-5835e546db44?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Crispy Calamari',
                category: 'Appetizer',
                price: 13.50,
                description: 'Tender squid rings, lighty breaded and fried, served with marinara.',
                isAvailable: true,
                ingredients: ['Squid', 'Flour', 'Marinara Sauce', 'Lemon'],
                preparationTime: 18,
                imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Spring Rolls',
                category: 'Appetizer',
                price: 8.99,
                description: 'Crispy rolls filled with fresh vegetables and glass noodles.',
                isAvailable: true,
                ingredients: ['Cabbage', 'Carrots', 'Wrapper', 'Soy Sauce'],
                preparationTime: 15,
                imageUrl: 'https://images.unsplash.com/photo-1544025162-d76690b67f61?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Chicken Wings',
                category: 'Appetizer',
                price: 14.99,
                description: 'Spicy buffalo wings served with blue cheese dip and celery.',
                isAvailable: true,
                ingredients: ['Chicken Wings', 'Buffalo Sauce', 'Butter', 'Celery'],
                preparationTime: 25,
                imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Nachos Supreme',
                category: 'Appetizer',
                price: 12.50,
                description: 'Tortilla chips topped with melted cheese, jalapeños, and salsa.',
                isAvailable: true,
                ingredients: ['Tortilla Chips', 'Cheese', 'Jalapeños', 'Salsa', 'Guacamole'],
                preparationTime: 15,
                imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80'
            },

            // --- Main Course (8) ---
            {
                name: 'Pepperoni Pizza',
                category: 'Main Course',
                price: 18.50,
                description: 'Classic hand-tossed pizza topped with spicy pepperoni and mozzarella.',
                isAvailable: true,
                ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Pepperoni'],
                preparationTime: 20,
                imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Crispy Fried Chicken',
                category: 'Main Course',
                price: 14.00,
                description: 'Golden brown fried chicken pieces served with coleslaw.',
                isAvailable: true,
                ingredients: ['Chicken', 'Flour', 'Spices', 'Oil'],
                preparationTime: 25,
                imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Hyderabadi Biryani',
                category: 'Main Course',
                price: 16.99,
                description: 'Aromatic basmati rice cooked with tender chicken and authentic spices.',
                isAvailable: true,
                ingredients: ['Basmati Rice', 'Chicken', 'Yogurt', 'Saffron', 'Spices'],
                preparationTime: 40,
                imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Butter Chicken',
                category: 'Main Course',
                price: 15.50,
                description: 'Creamy tomato-based curry with succulent chicken pieces.',
                isAvailable: true,
                ingredients: ['Chicken', 'Tomato Puree', 'Cream', 'Butter', 'Fenugreek'],
                preparationTime: 30,
                imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Spaghetti Carbonara',
                category: 'Main Course',
                price: 14.50,
                description: 'Italian pasta dish with egg, cheese, cured pork, and black pepper.',
                isAvailable: true,
                ingredients: ['Spaghetti', 'Eggs', 'Pecorino Romano', 'Guanciale', 'Pepper'],
                preparationTime: 20,
                imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Hakka Noodles',
                category: 'Main Course',
                price: 10.99,
                description: 'Stir-fried noodles with crunchy vegetables and soy sauce.',
                isAvailable: true,
                ingredients: ['Noodles', 'Soy Sauce', 'Cabbage', 'Carrots', 'Capsicum'],
                preparationTime: 15,
                imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Grilled Salmon',
                category: 'Main Course',
                price: 22.00,
                description: 'Fresh salmon fillet grilled with herbs and lemon butter sauce.',
                isAvailable: true,
                ingredients: ['Salmon', 'Lemon', 'Butter', 'Asparagus'],
                preparationTime: 25,
                imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Vegetable Stir Fry',
                category: 'Main Course',
                price: 11.50,
                description: 'Mix of seasonal vegetables tossed in a savory ginger-soy glaze.',
                isAvailable: true,
                ingredients: ['Broccoli', 'Carrots', 'Bell Peppers', 'Soy Sauce', 'Ginger'],
                preparationTime: 18,
                imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
            },

            // --- Desserts (3) ---
            {
                name: 'Chocolate Cake Slice',
                category: 'Dessert',
                price: 8.99,
                description: 'Decadent multi-layered chocolate cake slice topped with rich ganache.',
                isAvailable: true,
                ingredients: ['Dark Chocolate', 'Cocoa Powder', 'Flour', 'Butter', 'Cream'],
                preparationTime: 15,
                imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Cheesecake',
                category: 'Dessert',
                price: 8.50,
                description: 'Creamy cheesecake with a graham cracker crust and berry topping.',
                isAvailable: true,
                ingredients: ['Cream Cheese', 'Sugar', 'Graham Crackers', 'Berries'],
                preparationTime: 10,
                imageUrl: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Tiramisu',
                category: 'Dessert',
                price: 9.50,
                description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers.',
                isAvailable: true,
                ingredients: ['Mascarpone', 'Coffee', 'Ladyfingers', 'Cocoa'],
                preparationTime: 15,
                imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80'
            },

            // --- Beverages (3) ---
            {
                name: 'Iced Coffee',
                category: 'Beverage',
                price: 4.99,
                description: 'Chilled coffee served over ice with a splash of milk.',
                isAvailable: true,
                ingredients: ['Coffee', 'Milk', 'Ice', 'Sugar'],
                preparationTime: 5,
                imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Mango Smoothie',
                category: 'Beverage',
                price: 5.99,
                description: 'Thick and creamy smoothie made with fresh mangoes.',
                isAvailable: true,
                ingredients: ['Mango', 'Yogurt', 'Honey', 'Ice'],
                preparationTime: 5,
                imageUrl: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80'
            },
            {
                name: 'Berry Lemonade',
                category: 'Beverage',
                price: 4.50,
                description: 'Refreshing lemonade infused with fresh berries and mint.',
                isAvailable: true,
                ingredients: ['Lemon', 'Mixed Berries', 'Mint', 'Sparkling Water'],
                preparationTime: 5,
                imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
            }
        ];

        const insertedItems = await MenuItem.insertMany(menuItemsData);
        console.log(`Seeded ${insertedItems.length} menu items.`);

        const generateOrder = (table, items, status, customer) => {
            const orderItems = items.map(i => {
                const item = insertedItems[i.idx % insertedItems.length]; // modulo to be safe
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
            generateOrder(1, [{ idx: 0, qty: 1 }, { idx: 14, qty: 2 }], 'Served', 'John Doe'),
            generateOrder(3, [{ idx: 6, qty: 1 }, { idx: 17, qty: 1 }], 'Preparing', 'Sarah Smith'),
            generateOrder(2, [{ idx: 1, qty: 1 }], 'Pending', 'Mike Johnson'),
            generateOrder(5, [{ idx: 9, qty: 2 }, { idx: 10, qty: 2 }], 'Ready', 'Emily Davis'),
            generateOrder(4, [{ idx: 7, qty: 3 }], 'Served', 'Alex Wilson'),
            generateOrder(6, [{ idx: 8, qty: 2 }, { idx: 18, qty: 1 }], 'Preparing', 'Chris Brown'),
            generateOrder(1, [{ idx: 15, qty: 2 }], 'Served', 'Reviewer One'),
            generateOrder(7, [{ idx: 2, qty: 1 }, { idx: 5, qty: 1 }], 'Pending', 'Guest'),
            generateOrder(8, [{ idx: 0, qty: 1 }, { idx: 12, qty: 1 }, { idx: 16, qty: 1 }], 'Ready', 'VIP Client'),
            generateOrder(2, [{ idx: 4, qty: 1 }, { idx: 13, qty: 1 }], 'Served', 'Sam'),
        ];

        await Order.insertMany(ordersData);
        console.log(`Seeded ${ordersData.length} orders.`);

        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedData();
