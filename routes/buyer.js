const router = require("express").Router();

const validation = require("../middleware/validate")
const buyerController = require("../controllers/buyer");

router.get("/" , buyerController.getAll);

router.get("/:id", buyerController.getSingle);

router.post("/", validation.saveBuyer, buyerController.createBuyer);

router.put("/:id", validation.saveBuyer, buyerController.updateBuyer);

router.delete("/:id",  buyerController.deleteBuyer);



module.exports = router;