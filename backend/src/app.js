const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config(); // Using default .env location or passed via command line. 
// Since .env is in backend root, and we run from backend root, dotenv.config() works.

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);

// Swagger Docs
// We need to create the swagger.yaml file next
try {
    const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
    console.log("Swagger file not found yet, skipping docs route");
}


// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
