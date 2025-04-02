const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
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
    try {
        const sellerId = new ObjectId(req.params.sellerId);
        const product = {
            sellerId: sellerId,
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price
        };

        const response = await mongodb.getDatabase().db().collection("Products").insertOne(product);

        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while creating the product");
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while creating the product", error: err });
    }
};

const updateProduct = async (req, res) => {
    try {

        const sellerId = new ObjectId(req.params.sellerId);
        const productId = new ObjectId(req.params.productId);

        const updatedProduct = {
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            sellerId: sellerId
        };

        const response = await mongodb.getDatabase().db().collection("Products").replaceOne({ sellerId: sellerId, _id: productId }, updatedProduct);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the product");
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while updating the product", error: err });
    }
};

const deleteProduct = async (req, res) => {
    try {

        const sellerId = new ObjectId(req.params.sellerId);
        const productId = new ObjectId(req.params.productId);

        const response = await mongodb.getDatabase().db().collection("Products").deleteOne({ sellerId: sellerId, _id: productId });

        if (response.deletedCount > 0) {
            res.status(204).send();
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
