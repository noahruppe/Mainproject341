const router = require("express").Router();

const validation = require("../middleware/validate")
const buyerController = require("../controllers/buyer");
const {isAuthenticated} = require("../middleware/authenticate");

router.get("/" , buyerController.getAll);

router.get("/:id", buyerController.getSingle);

router.post("/", isAuthenticated, validation.saveBuyer, buyerController.createBuyer);

router.put("/:id", isAuthenticated, validation.saveBuyer, buyerController.updateBuyer);

router.delete("/:id", isAuthenticated, buyerController.deleteBuyer);



module.exports = router;