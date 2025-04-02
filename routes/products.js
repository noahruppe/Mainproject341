const router = require("express").Router();

const productController = require("../controllers/products");


router.get("/:sellerId", productController.getAll);

router.get("/:sellerId/:productId", productController.getSingle);

router.post("/:sellerId", productController.createProduct);

router.put("/:sellerId/:productId",productController.updateProduct);

router.delete("/:sellerId/:productId",productController.deleteProduct);

module.exports = router;
