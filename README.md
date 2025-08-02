# 🏠 ThakurStore - Premium Furniture E-Commerce Platform

<div align="center">

![ThakurStore Logo](https://img.shields.io/badge/ThakurStore-Premium%20Furniture-8A41C6?style=for-the-badge&logo=home&logoColor=white)

*Crafting extraordinary spaces with premium furniture and timeless design*

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

[🔴 Live Demo](https://thakurstore.com) | [📖 Documentation](docs/) | [🐛 Report Bug](issues/) | [💡 Request Feature](issues/)

</div>

---

## 🌟 **Our Mission**

> **"Made with ❤️ for amazing homes"**

ThakurStore is more than just a furniture store - we're passionate about creating beautiful, functional spaces that reflect your unique style and enhance your everyday life. Since 2014, we've been committed to bringing high-quality, affordable furniture to homes across the country with exceptional craftsmanship and customer service.

---

## ✨ **Key Features**

### 🎨 **Design Excellence**
- **Immersive 3D Experience**: Three.js powered product visualization
- **Cinematic Loading Animations**: Custom loader with "YOUR WEB EXPERIENCE IS LOADING RIGHT NOW"
- **Dynamic Visual Effects**: Framer Motion animations, beams, and particle systems
- **Responsive Design**: Seamless experience across all devices

### 🛍️ **E-Commerce Functionality**
- **Product Catalog**: Comprehensive furniture collection with detailed specifications
- **Advanced Search & Filter**: Find products by category, price, material, and more
- **Wishlist & Cart**: Save favorites and manage purchases
- **Secure Checkout**: Multiple payment options with order tracking
- **User Reviews**: Verified customer feedback and ratings

### 🔐 **Authentication System**
- **Dual Login Methods**: Password-based and OTP email verification
- **Account Management**: Profile creation, email verification, password reset
- **Secure Sessions**: JWT-based authentication with refresh tokens
- **Social Integration**: Easy signup/login flow

### 📱 **User Experience**
- **Smooth Navigation**: Page transitions with custom loading states
- **Interactive Dock**: macOS-style navigation bar with magnification effects
- **Infinite Scrolling**: Seamless content loading
- **Progressive Enhancement**: Works offline with service workers

---

## 🛠️ **Tech Stack**

### **Frontend Architecture**
```
React 19.1.0 + Vite
├── 🎨 Styling & Animation
│   ├── Tailwind CSS 4.1.11
│   ├── Framer Motion 12.23.12
│   └── GSAP 3.13.0
├── 🌐 3D & Graphics
│   ├── Three.js 0.179.1
│   ├── React Three Fiber 9.3.0
│   └── React Three Drei 10.6.1
├── 🧭 Navigation & State
│   ├── React Router DOM 7.7.1
│   └── Context API
└── 📦 Build & Tools
    ├── Vite (Dev Server)
    ├── ESLint (Code Quality)
    └── PostCSS (CSS Processing)
```

### **Backend Infrastructure**
```
Node.js + Express.js
├── 🗄️ Database
│   └── MongoDB with Mongoose ODM
├── 🔐 Authentication
│   ├── JWT Tokens
│   ├── bcryptjs (Password Hashing)
│   └── Email OTP Verification
├── ☁️ File Storage
│   └── Cloudinary (Image Upload & CDN)
├── 📧 Communication
│   └── Email Service Integration
└── 🛡️ Security
    ├── CORS Protection
    ├── Rate Limiting
    └── Input Validation
```

---

## 🎯 **Core Pages & Features**

### 🏠 **Landing Page**
- **Hero Section**: Immersive video background with animated text
- **Product Showcase**: Interactive grid with hover effects
- **Infinite Marquee**: Continuous brand messaging
- **3D Elements**: Floating lanyard and beam effects
- **Dock Navigation**: macOS-style interactive dock

### 🛋️ **Product Pages**
- **Detailed Views**: High-resolution image galleries with zoom
- **Specifications**: Comprehensive product details and dimensions
- **Customer Reviews**: Verified purchase reviews with ratings
- **Related Products**: Smart recommendation engine
- **Quick Order**: Streamlined purchase flow

### 👤 **User Authentication**
- **Modern UI**: Glassmorphism design with blur effects
- **Dual Methods**: Password login or email OTP verification
- **Real-time Validation**: Instant feedback on form inputs
- **Progressive Disclosure**: Step-by-step account creation

### ℹ️ **About Us**
- **Company Story**: Our journey since 2014
- **Team Showcase**: Meet the passionate individuals behind ThakurStore
- **Values & Mission**: Sustainability, quality, design excellence
- **Statistics**: Customer satisfaction and business metrics

---

## 🎨 **Design Philosophy**

### **Visual Identity**
- **Color Palette**: Deep blacks (#0d0d0d) with purple/violet gradients
- **Typography**: Inter + Poppins for modern, clean readability
- **Animations**: Smooth 60fps transitions with easing functions
- **Glassmorphism**: Backdrop blur effects for depth and elegance

### **User Experience Principles**
1. **Performance First**: Optimized loading and smooth interactions
2. **Accessibility**: WCAG compliant with keyboard navigation
3. **Mobile-First**: Responsive design starting from 320px
4. **Progressive Enhancement**: Works without JavaScript

### **Component Architecture**
```
src/
├── 🧩 components/          # Reusable UI components
│   ├── Navbar.jsx         # Glassmorphism navigation
│   ├── Footer.jsx         # Rich footer with links
│   ├── LoaderComponent.jsx # Custom loading animations
│   ├── Dock.jsx           # Interactive dock navigation
│   ├── Beams.jsx          # 3D visual effects
│   └── SpotlightCard.jsx  # Interactive cards
├── 📄 pages/              # Route components
│   ├── LandingPage.jsx    # Homepage
│   ├── ProductDetailPage.jsx # Product details
│   ├── LoginPage.jsx      # Authentication
│   └── AboutPage.jsx      # Company information
├── 🔧 hooks/              # Custom React hooks
│   ├── useLoading.js      # Loading state management
│   └── useNavigateWithLoader.js # Navigation with loading
├── 🌐 services/          # API communication
│   ├── authService.js     # Authentication APIs
│   └── productService.js  # Product data APIs
└── 🎯 context/           # Global state management
    ├── AuthContext.jsx    # User authentication
    └── LoadingContext.jsx # Loading states
```

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- MongoDB 6+
- Git
- Modern web browser

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/NIKSH02/Thakur_hackathon.git
cd Thakur_hackathon
```

2. **Backend Setup**
```bash
cd Backend
npm install
```

3. **Environment Configuration**
```bash
# Create .env file in Backend directory
cp .env.example .env

# Configure your environment variables
MONGODB_URI=mongodb://localhost:27017/thakurstore
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_SERVICE_API_KEY=your_email_service_key
```

4. **Frontend Setup**
```bash
cd ../Frontend
npm install
```

5. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend  
cd Frontend
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## 📱 **Features Walkthrough**

### **🔄 Loading System**
Our signature loading experience with sequential text animation:
```
YOUR
WEB EXPERIENCE  
IS LOADING RIGHT NOW
```
- Counter animation from 1-100%
- Smooth fade transitions
- Custom messages per page
- Background blur effects

### **🎮 Interactive Elements**
- **Dock Navigation**: Magnification effects with smooth animations
- **3D Product Views**: Rotate and zoom product models
- **Particle Effects**: Dynamic beam systems and floating elements
- **Smooth Scrolling**: Lenis-powered scroll experience

### **📊 Product Management**
- **Image Upload**: Cloudinary integration with automatic optimization
- **Inventory Tracking**: Real-time stock management
- **Category System**: Hierarchical product organization
- **Search Engine**: Full-text search with filters

### **💳 Order Processing**
- **Cart Management**: Persistent cart across sessions
- **Order Tracking**: Real-time status updates
- **Payment Integration**: Secure payment gateway
- **Email Notifications**: Order confirmation and updates

---

## 🎨 **UI/UX Highlights**

### **Visual Effects**
- **Glassmorphism Cards**: Backdrop blur with transparency
- **Gradient Backgrounds**: Purple to violet gradients
- **Micro-interactions**: Hover states and click feedback
- **Loading Skeletons**: Smooth content placeholders

### **Animation System**
- **Page Transitions**: Smooth navigation between routes
- **Stagger Animations**: Sequential element reveals
- **Scroll Triggers**: Content animation on scroll
- **Physics-based**: Spring animations with natural feel

### **Responsive Design**
```css
/* Breakpoint System */
Mobile First: 320px
Tablet: 768px
Desktop: 1024px
Large: 1440px
Ultra-wide: 1920px+
```

---

## 📈 **Performance Optimizations**

### **Frontend**
- **Code Splitting**: Lazy-loaded routes and components
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Optimized chunk sizes
- **Caching Strategy**: Service worker implementation

### **Backend** 
- **Database Indexing**: Optimized MongoDB queries
- **API Caching**: Redis caching layer
- **Image CDN**: Cloudinary for fast delivery
- **Compression**: Gzip compression for responses

---

## 🔒 **Security Features**

- **Input Validation**: Comprehensive data sanitization
- **Authentication**: JWT with refresh token rotation
- **CORS Protection**: Configured cross-origin policies
- **Rate Limiting**: API endpoint protection
- **XSS Prevention**: Content Security Policy headers
- **SQL Injection**: Parameterized queries and validation

---

## 🤝 **Contributing**

We welcome contributions! Please follow our guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Development Guidelines**
- Follow ESLint configuration
- Write component tests
- Update documentation
- Ensure mobile responsiveness

---

## 📞 **Contact & Support**

<div align="center">

**ThakurStore Team**

📧 **Email**: hello@thakurstore.com  
📍 **Address**: 123 Furniture Lane, Design District, NY 10001  
📱 **Phone**: +1 (555) 123-4567  

**Connect With Us**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/company/thakurstore)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white)](https://twitter.com/thakurstore)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/thakurstore)

</div>

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Design Inspiration**: Modern e-commerce platforms
- **3D Assets**: Community contributed models
- **Icons**: Lucide React and React Icons
- **Fonts**: Google Fonts (Inter, Poppins)
- **Animation Library**: Framer Motion team

---

<div align="center">

**Built with ❤️ by the ThakurStore Team**

*Transforming houses into homes, one piece at a time.*

![Footer Wave](https://img.shields.io/badge/ThakurStore-2025-8A41C6?style=for-the-badge&logo=home&logoColor=white)

</div>