const mongoose = require("mongoose");

const Item = require("../models/Item");

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send({ msg: "list of items", items });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not bring the items" }],
        });
    }
};

exports.getItem = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findOne({ _id: id });
        res.status(200).send({ msg: "this is the item", item });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not bring the item" }],
        });
    }
};

exports.addItem = async (req, res) => {
    try {
        const newItem = req.body;
        const item = new Item(newItem);
        await item.save();
        res.status(200).send({ msg: "item is added", item });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not add the item" }],
        });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.updateOne({ _id: id }, { $set: req.body });
        res.status(200).send({ msg: "item is updated", item });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not update the item" }],
        });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findByIdAndRemove({ _id: id });
        res.status(200).send({ msg: "item is deleted", item });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not delete the item" }],
        });
    }
};

//searchbar item
// exports.searchItem = async (req, res) => {

// exports.searchItem = async (req, res) => {
//     var re = new RegExp(req.headers.input, "i");
//     Item.find({ title: { $regex: re } })
//         .then((data) => res.send(data))
//         .catch((err) => console.log(err));
// };

exports.updateRate = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findByIdAndUpdate(id, req.body);
        res.status(200).send({ msg: "item is rated", item });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not rate the product" }],
        });
    }
};
