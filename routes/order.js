const router = require("express").Router();
const orderController = require("../controllers/order");
const validation = require("../middleware/validate")

// Get all orders for a buyer
router.get("/:buyerId", orderController.getAllOrders);

// Get a specific order for a buyer, seller, and product
router.get("/:buyerId/:orderId", orderController.getSingleOrder);

// Create a new order for a buyer, linking buyer, seller, and product
router.post("/:buyerid/:sellerid/:productid", validation.saveOrder, orderController.createOrder);

// Update an order for a buyer, seller, and product
router.put("/:buyerId/:orderId", validation.saveOrder,  orderController.updateOrder);


// Delete an order for a buyer, seller, and product
router.delete("/:buyerId/:orderId", orderController.deleteOrder);


module.exports = router;
