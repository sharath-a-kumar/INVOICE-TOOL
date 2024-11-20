// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const customerRoutes = require('./routes/customerRoutes');
// const productRoutes = require('./routes/productRoutes');
// const invoiceRoutes = require('./routes/invoiceRoute')

// require("dotenv").config();
// dotenv.config();


// const app = express();
// connectDB();

// app.use(express.json());
// app.use('/api', customerRoutes, productRoutes ,invoiceRoutes);
// // app.use('/api/', productRoutes);


// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoute');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require("cors");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  res.status(404).json({
      success: false,
      message: 'Route not found',
  });
});

app.use(errorHandler);
// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
