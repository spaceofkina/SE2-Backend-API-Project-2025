const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Supplier = require('./models/Supplier');
const Order = require('./models/Order');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Product.deleteMany();
        await Supplier.deleteMany();
        await Order.deleteMany();
        console.log('Cleared existing data');

        // Create suppliers
        const suppliers = await Supplier.create([
        ]);
        console.log(`Created ${suppliers.length} suppliers`);

        // Create products
        const products = await Product.create([
        ]);
        console.log(`Created ${products.length} products`);

        // Create orders
        const orders = await Order.create([
        ]);
        console.log(`Created ${orders.length} orders`);

        console.log('✅ Database seeded successfully!');
        console.log('Sample data is ready for testing.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedData();