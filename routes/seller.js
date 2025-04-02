const router = require("express").Router();


const sellercontroller = require("../controllers/seller");


router.get("/" , sellercontroller.getAll);

router.get("/:id", sellercontroller.getSingle);

router.post("/", sellercontroller.createSeller);

router.put("/:id", sellercontroller.updateSeller);

router.delete("/:id", sellercontroller.deleteSeller);

module.exports = router;

