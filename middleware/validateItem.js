const { validationResult, check } = require("express-validator");

exports.productValidate = () => [
    check("image", "image is required").notEmpty(),
    check("title", "title is required").notEmpty(),
    check("description", "description is required").notEmpty(),
    check("price", "price is required").notEmpty(),
    check("category", "category is required").notEmpty(),
];

exports.Validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
