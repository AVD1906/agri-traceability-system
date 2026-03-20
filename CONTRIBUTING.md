# Contributing to Agri-Food Traceability System

Thank you for contributing! This guide will help you get started.

## 🌿 Branching Strategy

We use **Git Flow** branching model:

### Main Branches
- `main` - Production-ready code (protected)
- `develop` - Integration branch for features

### Supporting Branches
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

## 🔀 Workflow

### 1. Create Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. Make Changes
```bash
# Make your code changes
git add .
git commit -m "feat: add user authentication"
```

### 3. Push Branch
```bash
git push origin feature/your-feature-name
```

### 4. Create Pull Request
- Go to GitHub repository
- Click "New Pull Request"
- Base: `develop`, Compare: `feature/your-feature-name`
- Add description of changes
- Request review from team member

### 5. Code Review
- At least 1 team member must review
- Address any feedback
- Once approved, merge to `develop`

## 📝 Commit Message Format

Use conventional commits:

```
<type>: <description>

[optional body]
```

### Types
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Examples
```bash
feat: add batch creation endpoint
fix: resolve login authentication bug
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add unit tests for auth controller
chore: update dependencies
```

## 🧪 Before Submitting

### Backend Changes
- [ ] Code runs without errors
- [ ] All endpoints tested in Postman
- [ ] No console.log() left in code
- [ ] Environment variables documented
- [ ] Comments added for complex logic

### Frontend Changes
- [ ] Component renders correctly
- [ ] No console errors in browser
- [ ] Mobile responsive
- [ ] Tailwind classes used properly
- [ ] PropTypes/TypeScript types added

### Database Changes
- [ ] Migration script created
- [ ] Schema documented
- [ ] Indexes added if needed
- [ ] Sample data provided

## 👥 Code Review Checklist

When reviewing code:

- [ ] Code follows project structure
- [ ] No sensitive data (passwords, keys) committed
- [ ] Code is readable and well-commented
- [ ] No duplicate code
- [ ] Error handling implemented
- [ ] Tests pass (if applicable)
- [ ] Documentation updated

## 🚫 What NOT to Commit

- `.env` files with secrets
- `node_modules/` folders
- Build outputs (`build/`, `dist/`)
- IDE config files (`.vscode/`, `.idea/`)
- Log files
- Database backups with real data
- Passwords or API keys

## 📞 Need Help?

- Ask in team Discord/Slack
- Tag team members in PR comments
- Schedule code review session

## 🎯 Daily Workflow

```bash
# Start of day
git checkout develop
git pull origin develop
git checkout -b feature/todays-work

# During day
git add .
git commit -m "feat: progress on feature"

# End of day
git push origin feature/todays-work
# Create PR if feature complete
```

Happy coding! 🚀
