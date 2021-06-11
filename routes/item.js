const express = require("express");
const router = express.Router();
const {
    addItem,
    deleteItem,
    getItems,
    getItem,
    updateItem,
    searchItem,
    updateRate,
} = require("../controllers/itemControllers");
const { productValidate, Validation } = require("../middleware/validateItem");

// router.get("/products", searchItem);

router.get("/:id", getItem);

router.get("/", getItems);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

router.post("/", productValidate(), Validation, addItem);

router.put("/rate/:id", updateRate);

module.exports = router;
