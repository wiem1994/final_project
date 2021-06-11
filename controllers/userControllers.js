const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
    try {
        //req.body name,email,password,phone
        const { email } = req.body;

        //find user with that email
        const findUser = await User.findOne({ email });
        // test email
        if (findUser) {
            return res
                .status(400)
                .send({ errors: [{ msg: "Email should be unique" }] });
        }

        //new user
        const newUser = new User({ ...req.body });
        //hash password
        const passwordHashed = await bcrypt.hash(newUser.password, saltRounds);
        newUser.password = passwordHashed;
        //save user
        await newUser.save();
        //create token
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
        //response
        res.status(200).send({
            msg: "register successfully",
            user: newUser,
            token,
        });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "user can not be registered" }],
        });
    }
};

//login user
exports.Login = async (req, res) => {
    try {
        //email and password
        const { email, password } = req.body;
        //verif email
        const findUser = await User.findOne({ email });

        //si l'email n'existe pas
        if (!findUser) {
            //bad credential
            return res
                .status(400)
                .send({ errors: [{ msg: "Bad credential" }] });
        }
        //sinon verif password
        const comparePassword = await bcrypt.compare(
            password,
            findUser.password
        );
        //si passoword != hashed password
        if (!comparePassword) {
            //bad credential
            return res
                .status(400)
                .send({ errors: [{ msg: "Bad credential" }] });
        }
        const token = jwt.sign({ id: findUser._id }, process.env.SECRET_KEY);

        if (comparePassword)
            res.status(200).send({
                msg: "login successfully",
                user: findUser,
                token,
            });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not login" }] });
    }
};
// module.exports={function1,function2}
// module.exports.function1

//add cart
exports.AddCart = async (req, res) => {
    let user1 = await User.findById(req.params.id);
    let user2 = user1.cart;
    const found = user2.filter((el) => el.id == req.body.id);

    if (found.length > 0) {
        return res
            .status(500)
            .send({ errors: [{ msg: "item already in cart" }] });
    }

    try {
        // const id = req.params.id;
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: { cart: req.body },
            }
        );

        res.status(200).send({ msg: "item is added in user", user });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not add the item" }] });
    }
};

//+
exports.updateCart = async (req, res) => {
    try {
        let id = req.params.id;

        const user = await User.findById(id);

        const userCart = user.cart;
        userCart.forEach((el) => {
            if (el.id === req.body.id) {
                el.quantity = el.quantity + 1;
                el.price = el.initialPrice * el.quantity;
                el.totalCart = el.price;
            }
        });

        await User.findByIdAndUpdate(id, {
            $set: { cart: userCart },
        });

        res.status(200).send({
            msg: "quantity and price are updated",
        });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not update the quantity and price" }],
        });
    }
};

//-
exports.UpdateCart = async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User.findById(id);
        const userCart = user.cart;

        userCart.forEach((el) => {
            if (el.id === req.body.id) {
                if (el.quantity > 1) {
                    el.quantity = el.quantity - 1;
                    el.price = el.price - el.initialPrice;
                    el.totalCart = el.price;
                }
            }
        });

        await User.findByIdAndUpdate(id, {
            $set: { cart: userCart },
        });

        res.status(200).send({ msg: "quantity is updated", user });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "can not update the item" }] });
    }
};

//remove item

exports.removeItemUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        const cartUser = user.cart;
        const isFound = cartUser.filter((el) => el.id !== req.body.id);

        var userUpdated = await User.findByIdAndUpdate(id, {
            $set: { cart: isFound },
        });

        res.status(200).send({ msg: "item is removed", userUpdated });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not delete the item from the user" }],
        });
    }
};

//remove user

exports.removeUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.deleteOne({ _id });
        res.status(200).send({ msg: "item is removed from cart", user });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not bring the item" }],
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        res.status(200).send({ msg: "this is the user", user });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not bring the item" }],
        });
    }
};

exports.postComment = async (req, res) => {
    try {
        var user = await User.updateOne(
            { _id: req.params.id },
            {
                $push: { infoCom: req.body },
            }
        );

        res.status(200).send({ msg: "comment is added", user });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not post the comment" }],
        });
    }
};

//edit profile
exports.EditProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.updateOne({ _id: id }, { $set: req.body });
        res.status(200).send({ msg: "profile is updated", user });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not update the profile user" }],
        });
    }
};

//get comments
exports.getComment = async (req, res) => {
    try {
        const user1 = await User.findById(req.params.id);
        const com = user1.infoCom;
        const newCom = com.filter((el) => el.id === req.body.id);
        const user = await User.findByIdAndUpdate(id, {
            $set: { infoCom: newCom },
        });

        res.status(200).send({ msg: "this is the list of comments", user });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not update the profile user" }],
        });
    }
};

//delete

exports.deleteComment = async (req, res) => {
    try {
        const id = req.params.id;

        const user1 = await User.findById(id);
        const userCart = user1.infoCom;

        const isFound = userCart.filter((el) => el.id !== req.body.id);

        const user = await User.findByIdAndUpdate(id, {
            $set: { infoCom: isFound },
        });
        res.status(200).send({ msg: "comment is deleted", user });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not delete the comment" }],
        });
    }
};

//add fav item
exports.favoriteItem = async (req, res) => {
    try {
        let user1 = await User.findById(req.params.id);
        let userCart = user1.favoriteItem;
        const found = userCart.filter((el) => el.id == req.body.id);

        if (found.length > 0) {
            return res
                .status(500)
                .send({ msg: "item is already in wish list" });
        }

        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: { favoriteItem: req.body },
            }
        );

        res.status(200).send({ msg: "item is add to list wish", user });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "item is added to wish list" }],
        });
    }
};
// remove item from wish list
exports.favRemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body, "req.body");
        const user = await User.findById(id);
        const userCart = user.favoriteItem;
        const isFound = userCart.filter((el) => el.id !== req.body.id);
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: { favoriteItem: isFound },
        });
        res.status(200).send({
            msg: "item is removed from wish list",
            updatedUser,
        });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "item is added to wish list" }],
        });
    }
};

//add order
exports.addOrder = async (req, res) => {
    let user1 = await User.findById(req.params.id);
    const userCart = user1.cart;
    const orderCart = [...userCart];
    const arr = [];
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: { order: orderCart },
                $unset: { cart: [] },
            }
        );

        res.status(200).send({ msg: "order is added in user", user });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not add the order in the user" }],
        });
    }
};

//get comments of all users
exports.getComments = async (req, res) => {
    try {
        const users = await User.find({ userType: false });
        var arr = [];
        const comments = users.map((el) => arr.push(el.infoCom));
        res.status(200).send({ msg: "list of comments", comments });
    } catch (error) {
        res.status(500).send({
            errors: [{ msg: "can not bring the comments" }],
        });
    }
};

//admin deleting user's comments
exports.delComment = async (req, res) => {
    try {
        const users = await User.find({ userType: false });
        var foundUser = users.filter((user) => user._id == req.body.idUser);
        console.log("user", foundUser);
        const foundIdUser = foundUser[0]._id;
        console.log("foundId", foundIdUser);
        const updatedUser = await User.findByIdAndUpdate(foundIdUser, {
            $pull: { infoCom: { id: req.body.id } },
        });
        res.status(200).send({
            msg: "comment of user is deleted",
            updatedUser,
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).send({
            errors: [{ msg: "can not delete the comment of the user" }],
        });
    }
};
