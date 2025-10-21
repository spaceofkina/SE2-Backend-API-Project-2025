# Project Submission - Inventory Store API

## Student Information
- **Name**: [Katrina Jasmine Espenida]
- **Course**: [BS Computer Science 4-2]
- **Date**: $(Get-Date -Format "2025-10-16")

## Project Overview
Complete REST API for inventory management system with full CRUD operations.

## Base URL
\`http://localhost:3000\`

## API Endpoints

### Products
- \`GET /api/products\` - List all products with pagination
- \`GET /api/products/:id\` - Get single product
- \`POST /api/products\` - Create new product
- \`PUT /api/products/:id\` - Update product
- \`DELETE /api/products/:id\` - Delete product

### Suppliers
- \`GET /api/suppliers\` - List all suppliers
- \`GET /api/suppliers/:id\` - Get single supplier
- \`POST /api/suppliers\` - Create new supplier
- \`PUT /api/suppliers/:id\` - Update supplier
- \`DELETE /api/suppliers/:id\` - Delete supplier

### Orders
- \`GET /api/orders\` - List all orders
- \`GET /api/orders/:id\` - Get single order
- \`POST /api/orders\` - Create new order
- \`PUT /api/orders/:id\` - Update order status
- \`DELETE /api/orders/:id\` - Delete order

## Technologies Used
- Node.js + Express
- MongoDB Atlas (Cloud Database)
- Mongoose ODM
- dotenv for environment variables
- CORS middleware

## Features Implemented
✅ Full CRUD operations for all resources
✅ MongoDB Atlas hosted database
✅ Proper HTTP status codes (200, 201, 400, 404, 500)
✅ Input validation on create/update
✅ Pagination on list endpoints (?page=1&limit=10)
✅ CORS enabled
✅ Environment variable security
✅ Error handling middleware
✅ Sample test data with seeder

## Sample Test Data
The database is pre-seeded with:
- 2 products
- 3 suppliers
- 2 orders 

## How to Run Locally
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Set up environment variables in .env file
# 3. Seed the database
npm run seed

# 4. Start the server
npm run dev

# 5. Test API at http://localhost:3000/api/products
\`\`\`

## Environment Variables Used
- \`MONGO_URI\` - MongoDB Atlas connection string
- \`PORT\` - Server port (default: 3000)
- \`NODE_ENV\` - Environment mode

## Postman Collection
Included: \`Inventory-Store-API.postman_collection.json\`

## Repository Structure
\`\`\`
├── config/          # Database configuration
├── controllers/     # Business logic
├── models/          # MongoDB schemas
├── routes/          # API endpoints
├── README.md        # Documentation
├── DEPLOYMENT.md    # Deployment guide
├── Inventory-Store-API.postman_collection.json
└── [source files]
\`\`\`

## Test Credentials
No authentication required - API is open for testing.

## Notes
- All endpoints return JSON responses
- Proper error handling with descriptive messages
- MongoDB Atlas ensures data persistence
- Code follows MVC architecture pattern