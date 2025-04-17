const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAllOrders = async (req, res) => {
    // #swagger.tags = ["Orders"]
    try {
        const buyerId = new ObjectId(req.params.buyerId);
        const result = await mongodb.getDatabase().db().collection("Orders").find({ buyerId: buyerId });
        const orders = await result.toArray();

        res.setHeader("Content-type", "application/json");
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while fetching the orders", error: err });
    }
};


const getSingleOrder = async (req, res) => {
    // #swagger.tags = ["Orders"]
    try {
        const buyerId = new ObjectId(req.params.buyerId);
        const orderId = new ObjectId(req.params.orderId);

        // Query the Orders collection for the specific order based on buyerId and orderId
        const order = await mongodb.getDatabase().db().collection("Orders").findOne({
            buyerId: buyerId,
            _id: orderId
        });

        // If the order is found, return it, otherwise send an error message
        if (order) {
            res.setHeader("Content-type", "application/json");
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        // Handle any errors that occur during the query
        res.status(500).json({ message: "An error occurred while fetching the order", error: err });
    }
};


// Create a new order (linking buyer, seller, and product)
const createOrder = async (req, res) => {
    // #swagger.tags = ["Orders"]
    try {
        // Extract buyerId, sellerId, and productId from the request parameters
        const buyerid = new ObjectId(req.params.buyerid);  // Buyer ID from URL parameter
        const sellerid = new ObjectId(req.params.sellerid); // Seller ID from URL parameter
        const productid = new ObjectId(req.params.productid); // Product ID from URL parameter

        // Fetch product details by productId and sellerId
        const product = await mongodb.getDatabase().db().collection("Products").findOne({
            _id: productid,
            sellerId: sellerid
        });

        // If the product does not exist for the specified seller, return an error
        if (!product) {
            return res.status(400).json({ message: "Product not found for the specified seller." });
        }

        // Fetch buyer details by buyerId
        const buyer = await mongodb.getDatabase().db().collection("Buyers").findOne({
            _id: buyerid
        });

        // If the buyer doesn't exist, return an error
        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found." });
        }

        // Create the order object
        const order = {
            buyerId: buyerid,
            sellerId: sellerid,
            productId: productid,
            quantity: req.body.quantity,
            buyerName: `${buyer.firstName} ${buyer.lastName}`,  // Include the buyer's full name
            productName: product.productName  // Include the product's name
        };

        // Insert the order into the database
        const response = await mongodb.getDatabase().db().collection("Orders").insertOne(order);

        // If the order was successfully created, send a response with order details
        if (response.acknowledged) {
            res.status(201).json({ message: "Order created successfully" });
        } else {
            res.status(500).json(response.error || "Some error occurred while creating the order");
        }
    } catch (err) {
        // Handle any other errors
        res.status(500).json({ message: "An error occurred while creating the order", error: err });
    }
};



// Update an order's status (following your provided structure)
const updateOrder = async (req, res) => {
    // #swagger.tags = ["Orders"]
    try {
        const buyerId = new ObjectId(req.params.buyerId);
        const orderId = new ObjectId(req.params.orderId);

        console.log("Buyer ID:", buyerId);
        console.log("Order ID:", orderId);

        const updatedFields = {};
        if (req.body.quantity !== undefined) {
            updatedFields.quantity = req.body.quantity;
        }

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update." });
        }

        const response = await mongodb.getDatabase().db().collection("Orders").updateOne(
            { _id: orderId, buyerId: buyerId }, 
            { $set: updatedFields }
        );

        if (response.modifiedCount > 0 && req.body.quantity !== undefined) {
            // Retrieve the updated order
            const order = await mongodb.getDatabase().db().collection("Orders").findOne({ _id: orderId });

            // Fetch the product price
            const product = await mongodb.getDatabase().db().collection("Products").findOne({ _id: order.productId });

            if (!product) {
                return res.status(404).json({ message: "Product not found while updating payment." });
            }

            // Recalculate amount
            const quantity = Number(order.quantity);
            const price = Number(product.price);
            const totalAmount = quantity * price;

            // Update the corresponding payment amount
            await mongodb.getDatabase().db().collection("Payments").updateOne(
                { orderId: orderId },
                { $set: { amount: totalAmount } }
            );
        }

        res.status(200).json({ message: "Order and payment amount updated successfully" });

    } catch (err) {
        res.status(500).json({ message: "An error occurred while updating the order", error: err });
    }
};




// Delete an order
const deleteOrder = async (req, res) => {
    // #swagger.tags = ["Orders"]
    try {
        const buyerId = new ObjectId(req.params.buyerId);  // Buyer ID from URL parameter
        const orderId = new ObjectId(req.params.orderId);  //     Order ID from URL parameter

        // Perform the delete operation
        const response = await mongodb.getDatabase().db().collection("Orders").deleteOne({
            buyerId: buyerId,
            _id: orderId  // Match the specific order for this buyer
        });

        // Check if the order was successfully deleted
        if (response.deletedCount > 0) {
            res.status(200).json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found or not associated with this buyer." });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the order", error: err });
    }
};



module.exports = {
    getAllOrders,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder,
};
