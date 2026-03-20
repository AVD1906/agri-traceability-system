# 🌾 Agri-Food Supply Traceability System

> A comprehensive web-based platform for tracking food products from farm to table with complete supply chain transparency.

## 📋 Project Overview

The Agri-Food Supply Traceability System tracks and monitors the journey of food products across the entire supply chain — from harvesting to retail. It ensures accountability, reduces leaks and tampering, and provides complete transparency for all stakeholders.

### Key Features

- ✅ Complete traceability from farm to consumer
- ✅ Leak detection and loss tracking at every stage
- ✅ Role-based access control (Farmer, Distributor, Retailer, Admin)
- ✅ Real-time event logging with timestamps
- ✅ Transaction management and invoice generation
- ✅ Quality control system with inspections
- ✅ Analytics dashboard with visual charts
- ✅ Location tracking for all supply chain stages

## 🏗️ Project Structure

```
agri-traceability-system/
├── backend/                 # Node.js/Express backend
├── frontend/               # React frontend
├── database/               # Database scripts and schema
├── docs/                   # Documentation
├── .github/                # GitHub workflows and templates
└── README.md              # This file
```

## 👥 Team Members

| Role | Name | Responsibilities |
|------|------|-----------------|
| **Backend Dev 1** | [Your Name] | Authentication, Users, Products, Analytics |
| **Backend Dev 2** | [Your Name] | Locations, Batches, Events, Transactions, Quality |
| **Frontend Dev 1** | [Your Name] | Auth UI, Products UI, Locations UI, Dashboards |
| **Frontend Dev 2** | [Your Name] | Batches UI, Quality UI, Timeline, Charts |

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MySQL (v8.0)
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** express-validator

### Frontend
- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Icons:** Lucide React

### Development Tools
- **Version Control:** Git & GitHub
- **API Testing:** Postman
- **Database Management:** MySQL Workbench
- **Code Editor:** VS Code

## 🗄️ Database Schema

The system uses **7 tables**:

1. **users** - Authentication and user profiles
2. **products** - Food item catalog
3. **locations** - Farms, warehouses, distribution centers, stores
4. **batches** - Core tracking entities
5. **supply_chain_events** - Complete audit trail
6. **transactions** - Financial records
7. **quality_checks** - Inspection records

See [Database Documentation](./database/README.md) for complete schema.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn
- Git

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/agri-traceability-system.git
cd agri-traceability-system
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

#### 3. Database Setup
```bash
# In MySQL Workbench or terminal
mysql -u root -p
CREATE DATABASE agri_traceability;
USE agri_traceability;
source database/schema.sql;
source database/seed.sql;
```

#### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Default Credentials (Development)
- **Admin:** username: `admin`, password: `admin123`

## 📚 Documentation

- [Backend API Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Database Schema](./database/README.md)
- [User Manual](./docs/USER_MANUAL.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🔗 Deployed Links

- **Frontend:** [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)
- **Backend API:** [https://your-backend-url.railway.app](https://your-backend-url.railway.app)

## 📝 Development Timeline

- **Week 1 (Mar 21-27):** Backend Development
- **Week 2 (Mar 28 - Apr 2):** Frontend Development
- **Week 3 (Apr 3-6):** Testing & Deployment

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Create a Pull Request

## 📧 Contact

For questions or issues, please contact:
- [Your Name] - [your.email@example.com]

## 📄 License

This project is licensed for educational purposes.

---

**Built with ❤️ by [Your Team Name]**
