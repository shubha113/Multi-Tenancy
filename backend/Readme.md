# Multi-Tenant SaaS Notes Application - Backend

A secure, scalable multi-tenant SaaS application built with Node.js, Express, and MongoDB.

## 🏗️ Multi-Tenancy Architecture

**Approach:** Shared Schema with Tenant ID Column

This approach was chosen for the following reasons:
- **Cost-effective**: Single database reduces infrastructure costs
- **Scalable**: Easy to add new tenants without database provisioning
- **Maintainable**: Centralized schema updates and migrations
- **Performance**: Efficient queries with proper indexing on tenant fields
- **Backup**: Simplified backup and restore processes

### Data Isolation
- Every data model includes a `tenant` field referencing the tenant ID
- Database queries are automatically scoped to the authenticated user's tenant
- Middleware ensures strict tenant isolation at the API level
- No cross-tenant data access is possible

## 🚀 Features

- ✅ **Multi-tenant architecture** with strict data isolation
- ✅ **JWT-based authentication** with role-based access control
- ✅ **Subscription-based feature gating** (Free/Pro plans)
- ✅ **Complete CRUD operations** for notes
- ✅ **Tenant subscription management**
- ✅ **Rate limiting and security** headers
- ✅ **CORS enabled** for cross-origin requests
- ✅ **Health check endpoint**
- ✅ **Pre-seeded test data**

## 📁 Project Structure

```
backend/
├── config/database.js          # MongoDB connection
├── controllers/                # Business logic
│   ├── authController.js
│   ├── notesController.js
│   └── tenantController.js
├── middleware/                 # Custom middleware
│   ├── auth.js
│   ├── catchAsyncError.js
│   ├── errorMiddleware.js
│   └── tenantMiddleware.js
├── models/                     # Mongoose schemas
│   ├── User.js
│   ├── Note.js
│   └── Tenant.js
├── routes/                     # API routes
│   ├── authRoutes.js
│   ├── notesRoutes.js
│   └── tenantRoutes.js
├── utils/                      # Utility functions
│   ├── errorHandler.js
│   ├── sendToken.js
│   └── seedDatabase.js
├── app.js                      # Express app configuration
├── server.js                   # Server entry point
├── vercel.json                 # Vercel deployment config
└── package.json
```

## 🛠️ Installation & Setup

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/saas-notes?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
```

### 3. Run the Application

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Authentication
```
POST /api/v1/auth/login          # User login
POST /api/v1/auth/logout         # User logout  
GET  /api/v1/auth/profile        # Get current user profile
```

### Notes Management
```
POST   /api/v1/note/crate        # Create a new note
GET    /api/v1/note/get          # Get all notes for current tenant
GET    /api/v1/note/get/:id      # Get specific note by ID
PUT    /api/v1/note/update/:id   # Update note
DELETE /api/v1/note/delete/:id   # Delete note
```

### Tenant Management
```
POST /api/v1/tenants/:slug/upgrade   # Upgrade tenant subscription (Admin only)
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Admin and Member roles with different permissions
- **Tenant Isolation**: Complete data separation between tenants
- **Rate Limiting**: Prevents API abuse (100 requests per 15 minutes)
- **Security Headers**: Helmet.js for security headers
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Comprehensive error handling and logging

## 💰 Subscription Plans

### Free Plan
- Maximum 3 notes per tenant
- Basic note CRUD operations
- User management by admin

### Pro Plan  
- Unlimited notes
- All Free plan features
- Upgrade available via API endpoint
