// Noah Ruppe created all the code below

const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req,res) =>{
    // #swagger.tags = ["Payments"]
    try{
        const buyerId = new ObjectId(req.params.buyerId);
        const result = await mongodb.getDatabase().db().collection("Payments").find({buyerId: buyerId});
        const payment = await result.toArray();
        res.setHeader("Content-type", "application/json");
        res.status(200).json(payment);
    }catch (err){
        res.status(500).json({ message: "An error occurred while fetching the payment", error: err });
    }
};

const getSingle = async (req,res) =>{
    // #swagger.tags = ["Payments"]
    try{
        const buyerId = new ObjectId(req.params.buyerId);
        const paymentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("Payments").find({buyerId: buyerId, _id: paymentId});
        const payment = await result.toArray();
        
        res.setHeader("Content-type", "application/json");
        res.status(200).json(payment[0]);
    }catch (err){
        res.status(500).json({ message: "An error occurred while fetching the payment", error: err });
    }
}

const createPayment = async (req,res) =>{
    // #swagger.tags = ["Payments"]
    try{
        const orderId = new ObjectId(req.params.orderId);

        const order = await mongodb.getDatabase().db().collection("Orders").findOne({_id: orderId});

        if(!order){
            return res.status(404).json({message: "order was not found"});
        }

        const product = await mongodb.getDatabase().db().collection("Products").findOne({_id: order.productId});

        if(!product){
            return res.status(404).json({message: "there was no product"});
        }

        const quantity = Number(order.quantity);
        const price = Number(product.price);

        if (isNaN(quantity) || isNaN(price)) {
            return res.status(400).json({ message: "Invalid quantity or price data." });
        }

        const totalAmount = quantity * price;

        const payment = {
            orderId: orderId,
            buyerId: order.buyerId,
            sellerId: order.sellerId,
            productId: order.productId,
            amount: totalAmount,
            cardInfo: req.body.cardInfo
        }

        const response = await mongodb.getDatabase().db().collection("Payments").insertOne(payment);

        if (response.acknowledged) {
            res.status(201).json({ message: "Payment created successfully.", paymentId: response.insertedId, totalAmount });
        } else {
            res.status(500).json({ message: "Failed to create payment." });
        }
    }catch (err){
        res.status(500).json({ message: "An error occurred while creating the payment.", error: err });
    }
};

const updatePayment = async (req, res) => {
    // #swagger.tags = ["Payments"]
    try {
        const buyerId = new ObjectId(req.params.buyerId); // Fix here
        const paymentId = new ObjectId(req.params.id);

        const updateFields = {};

        // Update only the fields that are provided in req.body
        if (req.body.cardInfo) {
            updateFields.cardInfo = req.body.cardInfo;
        }

        const response = await mongodb.getDatabase().db().collection("Payments").updateOne(
            { _id: paymentId, buyerId: buyerId }, 
            { $set: updateFields }
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "Payment updated successfully" });
        } else {
            res.status(400).json({ message: "No payment was updated, check if the payment exists and if any values changed" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while updating the payment", error: err });
    }
};

const deletePayment = async (req, res) => {
    // #swagger.tags = ["Payments"]
    try {
        const buyerId = new ObjectId(req.params.buyerId);  // Buyer ID from URL parameter
        const paymentId = new ObjectId(req.params.id);  // Order ID from URL parameter

        // Perform the delete operation
        const response = await mongodb.getDatabase().db().collection("Payments").deleteOne({
            buyerId: buyerId,
            _id: paymentId  // Match the specific order for this buyer
        });

        // Check if the order was successfully deleted
        if (response.deletedCount > 0) {
            res.status(200).json({ message: "payment deleted successfully" });  
        } else {
            res.status(404).json({ message: "Payment not found or not associated with this buyer." });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the Payment", error: err });
    }
};





module.exports = {
    createPayment,
    getAll,
    getSingle,
    updatePayment,
    deletePayment
}
