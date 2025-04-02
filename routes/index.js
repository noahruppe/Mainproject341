const router = require("express").Router();

const hello = require("../controllers/helloworld");

router.get("/", hello.setup);

router.use("/buyer", require("./buyer"));

router.use("/seller", require("./seller"));

router.use("/product", require("./products"));

router.use("/order", require("./order"));
module.exports = router;