# 🚀 Quick Start Guide

Get your project up and running in minutes!

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js v18+ installed ([Download](https://nodejs.org/))
- [ ] MySQL v8+ installed ([Download](https://dev.mysql.com/downloads/))
- [ ] Git installed ([Download](https://git-scm.com/))
- [ ] VS Code installed ([Download](https://code.visualstudio.com/))
- [ ] GitHub account created

## ⚡ 5-Minute Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/agri-traceability-system.git
cd agri-traceability-system
```

### Step 2: Database Setup
```bash
# Open MySQL Workbench or terminal
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE agri_traceability;
USE agri_traceability;
SOURCE database/schema.sql;
SOURCE database/seed.sql;
exit;
```

### Step 3: Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Edit .env file with your MySQL password
# Then start server:
npm run dev
```

Backend should now run on http://localhost:5000

### Step 4: Frontend Setup
```bash
# In new terminal
cd frontend
npm install
npm start
```

Frontend should now open at http://localhost:3000

## ✅ Verify Setup

1. **Backend Test:**
   - Visit: http://localhost:5000
   - Should see: `{"message": "Agri-Food Traceability API"}`

2. **Frontend Test:**
   - Visit: http://localhost:3000
   - Should see: Login page

3. **Database Test:**
   ```sql
   USE agri_traceability;
   SHOW TABLES;
   -- Should show 7 tables
   ```

## 🎯 Default Login (Development Only)

```
Username: admin
Password: admin123
```

*Note: Change via API after first login*

## 🆘 Common Issues

### Port 5000 Already in Use
```bash
# Change PORT in backend/.env
PORT=5001
```

### MySQL Connection Failed
1. Check MySQL is running
2. Verify credentials in `.env`
3. Ensure database exists

### npm install Errors
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

1. Read [Backend README](./backend/README.md)
2. Read [Frontend README](./frontend/README.md)
3. Check [TODO.md](./TODO.md) for task tracking
4. Review [Database Schema](./database/README.md)

## 🤝 Team Workflow

```bash
# Daily routine:
git pull origin develop          # Get latest changes
git checkout -b feature/my-work  # Create feature branch
# ... do your work ...
git add .
git commit -m "feat: what I did"
git push origin feature/my-work
# Create Pull Request on GitHub
```

## 🎓 Learning Resources

- [React Docs](https://react.dev/)
- [Express Guide](https://expressjs.com/en/guide/routing.html)
- [Sequelize Docs](https://sequelize.org/docs/v6/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Ready to start building! 🚀**

Check the [17-Day Task Breakdown PDF](./docs/) for detailed daily tasks.
