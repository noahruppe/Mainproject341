// Noah Ruppe created all the code below

const router = require("express").Router();
const validation = require("../middleware/validate")
const {isAuthenticated} = require("../middleware/authenticate");

const paymentController = require("../controllers/payment");

router.get("/:buyerId", paymentController.getAll);

router.post("/:orderId", isAuthenticated, validation.savePayment, paymentController.createPayment);

router.get("/:buyerId/:id", paymentController.getSingle);

router.put("/:buyerId/:id", isAuthenticated, validation.savePayment,  paymentController.updatePayment);

router.delete("/:buyerId/:id", isAuthenticated, paymentController.deletePayment);

module.exports = router;