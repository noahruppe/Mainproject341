const router = require("express").Router();

const sellercontroller = require("../controllers/seller");
const { sellerValidationRules, validate } = require("../data/Validation");

router.get("/", sellercontroller.getAll);
router.get("/:id", sellercontroller.getSingle);

router.post(
  "/",
  sellerValidationRules,
  validate,
  sellercontroller.createSeller
);

router.put(
  "/:id",
  sellerValidationRules,
  validate,
  sellercontroller.updateSeller
);

router.delete("/:id", sellercontroller.deleteSeller);

module.exports = router;
