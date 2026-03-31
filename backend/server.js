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

// ===============================
// ✅ MIDDLEWARE
// ===============================

app.use(express.json());

// ✅ CORS FIX (Production Safe)
const allowedOrigins = [
  "http://localhost:5173",
  "https://advocate-sapna-sisodia.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(helmet());
app.use(morgan('dev'));

// ===============================
// ✅ RATE LIMITER
// ===============================
const limiter = require("./middleware/rateLimiter");

if (typeof limiter === 'function') {
  app.use(limiter);
} else {
  console.warn("Rate limiter is not a valid function. Skipping...");
}

// ===============================
// ✅ ROUTES
// ===============================
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

// Route list
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

// Validate and use routes
routes.forEach(r => {
  if (r.router && typeof r.router === 'function') {
    app.use(r.path, r.router);
  } else {
    console.warn(`Route at path "${r.path}" is not a valid router. Skipping.`);
  }
});

// ===============================
// ✅ TEST ROUTE
// ===============================
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ===============================
// ✅ GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// ===============================
// ✅ START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});