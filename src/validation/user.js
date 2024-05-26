const { body } = require("express-validator");

// For User Registration..
exports.checkUserRegInput = [
  body("name").trim().not().isEmpty().withMessage("Name required!"),
  body("mobile")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Mobile number is required!"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be longer than 5 characters!"),
];
