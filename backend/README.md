# Backend - Agri-Food Traceability System

> Node.js/Express backend with MySQL database

## 📁 Folder Structure

```
backend/
├── config/
│   └── database.js         # Sequelize connection config
├── controllers/
│   ├── authController.js   # Register, Login
│   ├── userController.js   # User CRUD
│   ├── productController.js
│   ├── locationController.js
│   ├── batchController.js
│   ├── eventController.js
│   ├── transactionController.js
│   ├── qualityController.js
│   └── analyticsController.js
├── middleware/
│   ├── auth.js             # JWT verification
│   ├── roleCheck.js        # Role-based access
│   ├── errorHandler.js     # Error handling
│   └── validateRequest.js  # Input validation
├── models/
│   ├── index.js            # Model associations
│   ├── User.js
│   ├── Product.js
│   ├── Location.js
│   ├── Batch.js
│   ├── SupplyChainEvent.js
│   ├── Transaction.js
│   └── QualityCheck.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── locationRoutes.js
│   ├── batchRoutes.js
│   ├── eventRoutes.js
│   ├── transactionRoutes.js
│   ├── qualityRoutes.js
│   └── analyticsRoutes.js
├── utils/
│   └── helpers.js          # Helper functions
├── .env.example            # Environment template
├── .gitignore
├── package.json
├── server.js               # Entry point
└── README.md               # This file
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=agri_traceability
JWT_SECRET=your_jwt_secret_key_change_this
PORT=5000
NODE_ENV=development
```

### 3. Database Setup
Make sure MySQL is running, then:
```bash
# In project root
cd ../database
mysql -u root -p < schema.sql
mysql -u root -p < seed.sql
```

### 4. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
```

### Users
```
GET    /api/users            # Get all users (admin)
GET    /api/users/:id        # Get user by ID
PUT    /api/users/:id        # Update user
DELETE /api/users/:id        # Delete user (admin)
```

### Products
```
POST   /api/products         # Create product
GET    /api/products         # Get all products
GET    /api/products/:id     # Get product by ID
PUT    /api/products/:id     # Update product
DELETE /api/products/:id     # Delete product
```

### Locations
```
POST   /api/locations        # Create location
GET    /api/locations        # Get all locations
GET    /api/locations/:id    # Get location by ID
PUT    /api/locations/:id    # Update location
DELETE /api/locations/:id    # Delete location
```

### Batches
```
POST   /api/batches          # Create batch (farmer)
GET    /api/batches          # Get batches (role-based)
GET    /api/batches/:id      # Get batch details
PUT    /api/batches/:id      # Update batch
DELETE /api/batches/:id      # Delete batch
```

### Supply Chain Events
```
POST   /api/events           # Log event
GET    /api/events           # Get all events
GET    /api/events/batch/:batchId  # Get batch timeline
PUT    /api/events/:id/verify     # Verify event (admin)
```

### Transactions
```
POST   /api/transactions     # Create transaction
GET    /api/transactions     # Get all transactions
GET    /api/transactions/:id # Get transaction details
```

### Quality Checks
```
POST   /api/quality          # Record quality check
GET    /api/quality          # Get all checks
GET    /api/quality/batch/:batchId  # Get batch quality history
```

### Analytics
```
GET    /api/analytics/overview      # System overview
GET    /api/analytics/revenue       # Revenue analytics
GET    /api/analytics/leakage       # Leakage analysis
GET    /api/analytics/quality       # Quality metrics
```

## 🔒 Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

## 🧪 Testing

Use Postman collection: [Download Here](./postman_collection.json)

## 🐛 Debugging

Enable debug mode:
```bash
DEBUG=* npm run dev
```

## 📦 Dependencies

```json
{
  "express": "^4.18.0",
  "mysql2": "^3.6.0",
  "sequelize": "^6.32.0",
  "bcrypt": "^5.1.0",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^16.0.0",
  "cors": "^2.8.5",
  "express-validator": "^7.0.0",
  "morgan": "^1.10.0",
  "helmet": "^7.0.0"
}
```

## 🔧 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if configured)
```

## 📝 Notes

- Port 5000 must be available
- MySQL must be running
- Ensure .env is configured correctly
- Never commit .env to Git
