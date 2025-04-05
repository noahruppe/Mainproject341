// Noah Ruppe created all the code below

const router = require("express").Router();

const productController = require("../controllers/products");
const { productValidationRules, validate } = require("../data/Validation");

router.get("/:sellerId", productController.getAll);

router.get("/:sellerId/:productId", productController.getSingle);

router.post(
  "/:sellerId",
  productValidationRules,
  validate,
  productController.createProduct
);

router.put(
  "/:sellerId/:productId",
  productValidationRules,
  validate,
  productController.updateProduct
);

router.delete("/:sellerId/:productId", productController.deleteProduct);

module.exports = router;
