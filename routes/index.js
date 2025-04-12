const router = require("express").Router();
const passport = require("passport");

const hello = require("../controllers/helloworld");

router.use("/", require("./swagger"));

// router.get("/", hello.setup);

router.use("/buyer", require("./buyer"));

router.use("/seller", require("./seller"));

router.use("/product", require("./products"));

router.use("/order", require("./order"));

router.use("/payment", require("./payment"));

router.get("/login", passport.authenticate("github"), (req,res) =>{});

router.get("/logout", function (req,res,next){
    req.logOut(function(err){
        if (err) {return next (err);}
        res.redirect("/");
    });
});
module.exports = router;