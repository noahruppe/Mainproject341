// Noah Ruppe created all the code below

const router = require("express").Router();
const validation = require("../middleware/validate")

const productController = require("../controllers/products");


router.get("/:sellerId", productController.getAll);

router.get("/:sellerId/:productId", productController.getSingle);

router.post("/:sellerId", validation.saveProduct, productController.createProduct);

router.put("/:sellerId/:productId", validation.saveProduct, productController.updateProduct);

router.delete("/:sellerId/:productId",productController.deleteProduct);

module.exports = router;
