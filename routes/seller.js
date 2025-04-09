const router = require("express").Router();
const validation = require("../middleware/validate")
const {isAuthenticated} = require("../middleware/authenticate");

const sellercontroller = require("../controllers/seller");


router.get("/" , sellercontroller.getAll);

router.get("/:id", sellercontroller.getSingle);

router.post("/", validation.saveSeller, isAuthenticated, sellercontroller.createSeller);

router.put("/:id", isAuthenticated, validation.saveSeller,  sellercontroller.updateSeller);

router.delete("/:id", isAuthenticated,  sellercontroller.deleteSeller);

module.exports = router;

