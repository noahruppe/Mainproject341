// Noah Ruppe created all the code below

const router = require("express").Router();
const validation = require("../middleware/validate")

const paymentController = require("../controllers/payment");

router.get("/:buyerId", paymentController.getAll);

router.post("/:orderId", validation.savePayment, paymentController.createPayment);

router.get("/:buyerId/:id", paymentController.getSingle);

router.put("/:buyerId/:id", validation.savePayment,  paymentController.updatePayment);

router.delete("/:buyerId/:id", paymentController.deletePayment);

module.exports = router;