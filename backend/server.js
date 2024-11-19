const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoute')

require("dotenv").config();
dotenv.config();


const app = express();
connectDB();

app.use(express.json());
app.use('/api', customerRoutes, productRoutes ,invoiceRoutes);
// app.use('/api/', productRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
