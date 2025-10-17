# Inventory Store API

A complete RESTful API for inventory management system built with Node.js, Express, and MongoDB Atlas.

## 🚀 Features

- Full CRUD operations for Products, Suppliers, and Orders
- MongoDB Atlas cloud database
- Pagination and filtering
- Proper error handling with HTTP status codes
- CORS enabled
- Environment variable security

## 📋 API Endpoints

### Base URL
\`http://localhost:3000\`

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/products\` | Get all products with pagination |
| GET | \`/api/products/:id\` | Get single product by ID |
| POST | \`/api/products\` | Create new product |
| PUT | \`/api/products/:id\` | Update product |
| DELETE | \`/api/products/:id\` | Delete product |

### Suppliers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/suppliers\` | Get all suppliers with pagination |
| GET | \`/api/suppliers/:id\` | Get single supplier by ID |
| POST | \`/api/suppliers\` | Create new supplier |
| PUT | \`/api/suppliers/:id\` | Update supplier |
| DELETE | \`/api/suppliers/:id\` | Delete supplier |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/orders\` | Get all orders with populated data |
| GET | \`/api/orders/:id\` | Get single order by ID |
| POST | \`/api/orders\` | Create new order |
| PUT | \`/api/orders/:id\` | Update order status |
| DELETE | \`/api/orders/:id\` | Delete order |

## 🛠️ Request Examples

### Get All Products
\`\`\`bash
GET http://localhost:3000/api/products
GET http://localhost:3000/api/products?page=1&limit=5
\`\`\`

### Create Product
\`\`\`bash
POST http://localhost:3000/api/products
Content-Type: application/json

{
            "_id": "68f0ddd3d81bc67dfb927dee",
            "sku": "Dai-007",
            "name": "Daisy",
            "price": 59.99,
            "stock": 20,
            "createdAt": "2025-10-16T11:58:11.247Z",
            "updatedAt": "2025-10-16T11:58:11.247Z",
            "__v": 0
        }
\`\`\`

### Create Supplier
\`\`\`bash
POST http://localhost:3000/api/suppliers
Content-Type: application/json

{
            "contact": {
                "email": "blooms@gmail.com",
                "phone": "+639057156748"
            },
            "_id": "68f0e1cbba17bb7fda751595",
            "name": "Everbloom",
            "createdAt": "2025-10-16T12:15:07.838Z",
            "updatedAt": "2025-10-16T12:15:07.838Z",
            "__v": 0
        }
\`\`\`

### Create Order
\`\`\`bash
POST http://localhost:3000/api/orders
Content-Type: application/json

{
            "_id": "68f0e71aba17bb7fda75182a",
            "items": [
                {
                    "productId": {
                        "_id": "68f0dbc9e59f7bb3d373cfd1",
                        "sku": "Rose-006",
                        "name": "Red Roses"
                    },
                    "quantity": 5,
                    "price": 59.99,
                    "_id": "68f0dbc9e59f7bb3d373cfd1"
                },
                {
                    "productId": {
                        "_id": "68f0dbc9e59f7bb3d373cfd1",
                        "sku": "Rose-006",
                        "name": "Red Roses"
                    },
                    "quantity": 3,
                    "price": 39.99,
                    "_id": "68f0dbc9e59f7bb3d373cfd1"
                }
            ],
            "supplierId": {
                "contact": {
                    "email": "freshflorals@gmail.com"
                },
                "_id": "68f0e182ba17bb7fda75156c",
                "name": "Fresh Florals"
            },
            "status": "pending",
            "totalAmount": 419.91999999999996,
            "createdAt": "2025-10-16T12:37:46.038Z",
            "updatedAt": "2025-10-16T12:37:46.038Z",
            "__v": 0
        }
\`\`\`

## 📁 Project Structure

\`\`\`
se-demo-crud-mongo-kat/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── productController.js  # Product business logic
│   ├── supplierController.js # Supplier business logic
│   └── orderController.js    # Order business logic
├── models/
│   ├── Product.js           # Product schema
│   ├── Supplier.js          # Supplier schema
│   └── Order.js             # Order schema
├── routes/
│   ├── productRoutes.js     # Product endpoints
│   ├── supplierRoutes.js    # Supplier endpoints
│   └── orderRoutes.js       # Order endpoints
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── app.js                  # Main application
├── package.json            # Dependencies and scripts
└── seedData.js             # Database seeder
\`\`\`

## 🚀 Quick Start

1. **Clone and install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up environment variables:**
   Create \`.env\` file with:
   \`\`\`env
   PORT=3000
   MONGO_URI=your_mongodb_atlas_connection_string
   NODE_ENV=development
   \`\`\`

3. **Seed the database:**
   \`\`\`bash
   npm run seed
   \`\`\`

4. **Start the server:**
   \`\`\`bash
   npm run dev    # Development with auto-reload
   # or
   npm start      # Production
   \`\`\`

5. **Test the API:**
   Visit \`http://localhost:3000/api/products\`

## 📝 Environment Variables

- \`PORT\` - Server port (default: 3000)
- \`MONGO_URI\` - MongoDB Atlas connection string
- \`NODE_ENV\` - Environment mode

## 🧪 Testing

Use the included Postman collection or test with:

\`\`\`bash
# Health check
curl http://localhost:3000/

# Get all products
curl http://localhost:3000/api/products
\`\`\`

## 📊 Sample Data

The seeder creates:
- 2 sample products
- 3 sample suppliers  
- 2 sample orders

## 🔧 Scripts

- \`npm start\` - Start production server
- \`npm run dev\` - Start development server with nodemon
- \`npm run seed\` - Populate database with sample data

## 🛡️ Security

- Environment variables for sensitive data
- Input validation on all endpoints
- Proper CORS configuration
- MongoDB Atlas with IP whitelisting

## 📄 License

ISC
