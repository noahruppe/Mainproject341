// Noah Ruppe created all the code below

const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ["Products"]
    try {
        const sellerId = new ObjectId(req.params.sellerId);
        const result = await mongodb.getDatabase().db().collection("Products").find({ sellerId: sellerId });
        const products = await result.toArray();

        res.setHeader("Content-type", "application/json");
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching the products", error: err });
    }
};

const getSingle = async (req, res) => {
     // #swagger.tags = ["Products"]
    try {
        const sellerId = new ObjectId(req.params.sellerId);
        const productId = new ObjectId(req.params.productId);
        const result = await mongodb.getDatabase().db().collection("Products").find({ sellerId: sellerId, _id: productId });
        const product = await result.toArray();

        res.setHeader("Content-type", "application/json");
        res.status(200).json(product[0]);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching the product", error: err });
    }
};

const createProduct = async (req, res) => {
     // #swagger.tags = ["Products"]
    try {
        const sellerId = new ObjectId(req.params.sellerId);
        const product = {
            sellerId: sellerId,
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            createdAt: new Date(),
            updatedAt: new Date(),
            warranty: req.body.warranty,
            stock: req.body.stock,
        };

        const response = await mongodb.getDatabase().db().collection("Products").insertOne(product);

        if (response.acknowledged > 0) {
            res.status(200).json({ message: "Product created successfully" });
        } else {
            res.status(500).json(response.error || "Some error occurred while creating the product");
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while creating the product", error: err });
    }
};

const updateProduct = async (req, res) => {
     // #swagger.tags = ["Products"]
    try {
        const sellerId = new ObjectId(req.params.sellerId);
        const productId = new ObjectId(req.params.productId);

        const updatedProduct = {
            sellerId: sellerId,
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            createdAt: new Date(),
            updatedAt: new Date(),
            warranty: req.body.warranty,
            stock: req.body.stock,
        };

        // Use updateOne with $set to update specific fields while keeping _id unchanged
        const response = await mongodb.getDatabase().db().collection("Products").updateOne(
            { sellerId: sellerId, _id: productId }, // Find product by sellerId and productId
            { $set: updatedProduct } // Update only specified fields
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: " Product updated successfully" });
        } else {
            res.status(400).json({ message: "No changes made or product not found." });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while updating the product", error: err });
    }
};


const deleteProduct = async (req, res) => {
     // #swagger.tags = ["Products"]
    try {

        const sellerId = new ObjectId(req.params.sellerId);
        const productId = new ObjectId(req.params.productId);

        const response = await mongodb.getDatabase().db().collection("Products").deleteOne({ sellerId: sellerId, _id: productId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(500).json(response.error || "An error occurred while deleting the product");
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the product", error: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct,
};
