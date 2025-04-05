const { body, validationResult } = require("express-validator");
const express = require("express");
const app = express();

app.use(express.json());

// Validation rules for Product
const productValidationRules = [
  body("productName").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Product description is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
];

// Validation rules for Buyer
const buyerValidationRules = [
  body("firstName").notEmpty().withMessage("Buyer name is required"),
  body("lastName").notEmpty().withMessage("Buyer name is required"),
  body("userName").notEmpty().withMessage("User name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("phone").isMobilePhone().withMessage("Invalid phone number"),
];

// Validation rules for Order
const orderValidationRules = [
  body("productId").notEmpty().withMessage("Product ID is required"),
  body("buyerId").notEmpty().withMessage("Buyer ID is required"),
  //   body("quantity")
  //     .isInt({ gt: 0 })
  //     .withMessage("Quantity must be greater than 0"),
];

// Validation rules for Seller
const sellerValidationRules = [
  body("sellerName").notEmpty().withMessage("Seller name is required"),
  body("userName").notEmpty().withMessage("User name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("phone").isMobilePhone().withMessage("Invalid phone number"),
  body("address").notEmpty().withMessage("Address is required"),
];

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  buyerValidationRules,
  orderValidationRules,
  productValidationRules,
  sellerValidationRules,
  validate,
};
