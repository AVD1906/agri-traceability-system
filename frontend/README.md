# Frontend - Agri-Food Traceability System

> React.js frontend with Tailwind CSS

## 📁 Folder Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Alert.jsx
│   │   │   └── Select.jsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── DashboardLayout.jsx
│   │   └── features/         # Feature-specific components
│   │       ├── ProductModal.jsx
│   │       ├── LocationModal.jsx
│   │       ├── BatchModal.jsx
│   │       ├── EventModal.jsx
│   │       ├── TransactionModal.jsx
│   │       ├── QualityModal.jsx
│   │       ├── BatchTimeline.jsx
│   │       └── StatCard.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Locations.jsx
│   │   ├── Batches.jsx
│   │   ├── BatchDetails.jsx
│   │   ├── Events.jsx
│   │   ├── Transactions.jsx
│   │   ├── QualityChecks.jsx
│   │   ├── Analytics.jsx
│   │   └── UserProfile.jsx
│   ├── services/
│   │   ├── api.js            # Axios instance
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── locationService.js
│   │   ├── batchService.js
│   │   ├── eventService.js
│   │   ├── transactionService.js
│   │   └── qualityService.js
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication context
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md                 # This file
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration (Optional)
Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm start
```

Application will open at `http://localhost:3000`

## 🎨 Styling

This project uses **Tailwind CSS** for styling.

### Common Tailwind Classes Used
- `bg-blue-600` - Blue background
- `text-white` - White text
- `px-4 py-2` - Padding
- `rounded-lg` - Rounded corners
- `shadow-md` - Shadow effect
- `hover:bg-blue-700` - Hover state

### Custom Tailwind Configuration
Edit `tailwind.config.js` to customize colors, spacing, etc.

## 🧩 Key Components

### Common Components
- **Button** - Reusable button with variants (primary, secondary, danger)
- **Input** - Form input with label and error display
- **Card** - Container card with shadow
- **Table** - Data table with sorting and pagination
- **Modal** - Popup dialog
- **Badge** - Status badges with colors
- **Loading** - Spinner animation
- **Alert** - Toast notifications

### Layout Components
- **Navbar** - Top navigation bar
- **Sidebar** - Side navigation menu
- **DashboardLayout** - Main layout wrapper

### Feature Components
- **BatchTimeline** - Vertical timeline for batch events
- **StatCard** - Statistics display card
- **Various Modals** - Forms for creating/editing data

## 🔐 Authentication Flow

1. User enters credentials on Login page
2. AuthContext calls `/api/auth/login`
3. JWT token stored in localStorage
4. Token attached to all API requests via axios interceptor
5. Protected routes check for token
6. Logout clears token and redirects to login

## 🛣️ Routes

```javascript
/                    → Login (public)
/login               → Login (public)
/register            → Register (public)
/dashboard           → Dashboard (protected)
/products            → Products List (protected)
/locations           → Locations List (protected)
/batches             → Batches List (protected)
/batches/:id         → Batch Details (protected)
/events              → Events List (protected)
/transactions        → Transactions List (protected)
/quality             → Quality Checks (protected)
/analytics           → Analytics Dashboard (protected)
/profile             → User Profile (protected)
```

## 📊 State Management

Using **React Context API** for:
- Authentication state (user, token)
- Global alerts/notifications

Using **Component State** for:
- Form inputs
- Loading states
- Modal visibility
- List data

## 🎯 Component Examples

### Using Common Components

```jsx
import Button from '../components/common/Button';
import Input from '../components/common/Input';

function MyForm() {
  return (
    <div>
      <Input 
        label="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
      />
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
```

### Using API Services

```jsx
import { productService } from '../services/productService';

const fetchProducts = async () => {
  try {
    const response = await productService.getAllProducts();
    setProducts(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🧪 Testing

```bash
npm test
```

## 📦 Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Configure environment variables
4. Deploy

### Netlify
1. Run `npm run build`
2. Drag `build/` folder to Netlify
3. Configure environment variables

## 📝 Environment Variables

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2E75B6',
        secondary: '#4472C4',
      }
    }
  }
}
```

### Adding New Page
1. Create `pages/NewPage.jsx`
2. Add route in `App.js`
3. Add navigation link in `Sidebar.jsx`

## 📱 Responsive Design

All components are mobile-responsive using Tailwind's responsive utilities:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

## 🐛 Debugging

1. Check browser console for errors
2. Verify API URL in `.env`
3. Check network tab for failed requests
4. Ensure backend is running

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)
- [React Router Docs](https://reactrouter.com/)
