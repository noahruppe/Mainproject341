const router = require("express").Router();

const paymentController = require("../controllers/payment");

router.get("/:buyerId", paymentController.getAll);

router.post("/:orderId", paymentController.createPayment);

router.get("/:buyerId/:id", paymentController.getSingle);

router.put("/:buyerId/:id", paymentController.updatePayment);

router.delete("/:buyerId/:id", paymentController.deletePayment);

module.exports = router;