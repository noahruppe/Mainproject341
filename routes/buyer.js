const router = require("express").Router();

const buyerController = require("../controllers/buyer");

router.get("/" , buyerController.getAll);

router.get("/:id", buyerController.getSingle);

router.post("/", buyerController.createBuyer);

router.put("/:id", buyerController.updateBuyer);

router.delete("/:id", buyerController.deleteBuyer);



module.exports = router;