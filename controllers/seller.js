const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
     // #swagger.tags = ["Sellers"]
    try {
        const result = await mongodb.getDatabase().db().collection("Sellers").find();
        const seller = await result.toArray();

        res.setHeader("Content-type", "application/json");
        res.status(200).json(seller);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching the seller", error: err });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ["Sellers"]
    try {
        const sellerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("Sellers").find({ _id: sellerId });
        const seller = await result.toArray();

        res.setHeader("Content-type", "application/json");
        res.status(200).json(seller[0]);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching the seller", error: err });
    }
};

const createSeller = async (req, res) => {
    // #swagger.tags = ["Sellers"]
    try {
        const seller = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };
        const response = await mongodb.getDatabase().db().collection("Sellers").insertOne(seller);
        if (response.acknowledged > 0) {
            res.status(200).json({ message: "Seller created successfully" });
        } else {
            res.status(500).json(response.error || "Some error occurred while inserting the seller");
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while creating the seller", error: err });
    }
};

const updateSeller = async (req, res) => {
    // #swagger.tags = ["Sellers"]
    try {
        const sellerId = new ObjectId(req.params.id);  

        
        const updatedSeller = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };

    
        const response = await mongodb.getDatabase().db().collection("Sellers").updateOne(
            { _id: sellerId },  
            { $set: updatedSeller }  
        );

        
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Seller updated successfully" }); 
        } else {
            res.status(400).json({ message: "No changes made or seller not found." });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while updating the seller", error: err });
    }
};


const deleteSeller = async (req, res) => {
    // #swagger.tags = ["Sellers"]
    try {
        const sellerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection("Sellers").deleteOne({ _id: sellerId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Seller deleted successfully" });
        } else {
            res.status(500).json(response.error || "An error occurred while deleting the seller");
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the seller", error: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createSeller,
    updateSeller,
    deleteSeller
};
