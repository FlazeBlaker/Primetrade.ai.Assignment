const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public (or Private based on requirements, making it Public for viewing)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('createdBy', 'username email');
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('createdBy', 'username email');

        if (!product) {
            return res.status(404).json({ success: false, message: `Product not found with id of ${req.params.id}` });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = async (req, res) => {
    try {
        // Add user to req,body
        req.body.createdBy = req.user.id;

        // Check for published product
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: `Product not found with id of ${req.params.id}` });
        }

        // Make sure user is product owner or admin
        if (product.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: `User ${req.user.id} is not authorized to update this product` });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: `Product not found with id of ${req.params.id}` });
        }

        // Make sure user is product owner or admin
        if (product.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: `User ${req.user.id} is not authorized to delete this product` });
        }

        await product.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
};
