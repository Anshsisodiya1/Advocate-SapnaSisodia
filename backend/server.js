const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://advocate-sapna-sisodia.vercel.app",
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Rate limiter middleware
const limiter = require("./middleware/rateLimiter");
if (typeof limiter === 'function') { 
    app.use(limiter); 
} else {
    console.warn("Rate limiter is not a valid function. Skipping...");
}

// Routes
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const seoRoutes = require("./routes/seoRoutes");   
const adminRoutes = require("./routes/adminRoutes");
const sitemapRoutes = require("./routes/sitemapRoutes");
const robotsRoutes = require("./routes/robotsRoutes");

// Use routes safely
const routes = [
    { path: '/api/contacts', router: contactRoutes },
    { path: '/api/admin/auth', router: authRoutes },
    { path: '/api/blogs', router: blogRoutes },
    { path: '/api/bookings', router: bookingRoutes },
    { path: '/api/inquiries', router: inquiryRoutes },
    { path: '/api/whatsapp', router: whatsappRoutes },
    { path: '/api/dashboard', router: dashboardRoutes },
    { path: '/api/seo', router: seoRoutes },
    { path: '/api/admin', router: adminRoutes },
    { path: '/sitemap', router: sitemapRoutes },
    { path: '/robots', router: robotsRoutes },
];

// Validate each router before using
routes.forEach(r => {
    if (r.router && typeof r.router === 'function') {
        app.use(r.path, r.router);
    } else {
        console.warn(`Route at path "${r.path}" is not a valid router. Skipping.`);
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});