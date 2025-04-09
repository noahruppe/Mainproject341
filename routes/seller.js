const router = require("express").Router();
const validation = require("../middleware/validate")


const sellercontroller = require("../controllers/seller");


router.get("/" , sellercontroller.getAll);

router.get("/:id", sellercontroller.getSingle);

router.post("/", validation.saveSeller, sellercontroller.createSeller);

router.put("/:id",validation.saveSeller,  sellercontroller.updateSeller);

router.delete("/:id", sellercontroller.deleteSeller);

module.exports = router;

