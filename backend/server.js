const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Routes
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const limiter = require("./middleware/rateLimiter");
const whatsappRoutes = require("./routes/whatsappRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const seoRoutes = require("./routes/seoRoutes");   
const sitemapRoutes = require("./routes/sitemapRoutes");
const robotsRoutes = require("./routes/robotsRoutes"); 
const adminRoutes = require("./routes/adminRoutes");


app.use('/api/contacts', contactRoutes);
app.use("/api/admin/auth",authRoutes);
app.use("/api/blogs",blogRoutes);
// app.use("/api/bookings",bookingRoutes);
app.use("/api/inquiries",inquiryRoutes);
app.use(limiter);
app.use("/api/whatsapp",whatsappRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/seo",seoRoutes);
app.use("/", sitemapRoutes);
app.use("/", robotsRoutes);
app.use("/api/admin", adminRoutes);




// Test Route
app.get('/', (req, res) => {
    res.send(' API is running...');
});

// Error handler 
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log("WhatsApp Number:", process.env.WHATSAPP_NUMBER);
});