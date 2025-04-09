// Noah Ruppe created all the code below

const router = require("express").Router();
const validation = require("../middleware/validate")
const {isAuthenticated} = require("../middleware/authenticate");

const productController = require("../controllers/products");


router.get("/:sellerId", productController.getAll);

router.get("/:sellerId/:productId", productController.getSingle);

router.post("/:sellerId", isAuthenticated, validation.saveProduct, productController.createProduct);

router.put("/:sellerId/:productId", isAuthenticated, validation.saveProduct, productController.updateProduct);

router.delete("/:sellerId/:productId", isAuthenticated, productController.deleteProduct);

module.exports = router;
