const express = require("express");
const { body, validationResult } = require("express-validator");

const buyerController = require("../controllers/buyer");
const { buyerValidationRules, validate } = require("../data/Validation");
const router = express.Router();

router.get("/", buyerController.getAll);

router.get("/:id", buyerController.getSingle);

router.post("/", buyerValidationRules, validate, buyerController.createBuyer);

router.put("/:id", buyerValidationRules, validate, buyerController.updateBuyer);

router.delete("/:id", buyerController.deleteBuyer);

module.exports = router;
