const express = require("express");
const {
    Register,
    Login,
    AddCart,
    getUser,
    updateCart,
    UpdateCart,
    removeUser,
    removeItemUser,
    postComment,
    EditProfile,
    getComment,
    deleteComment,
    favoriteItem,
    favRemoveItem,
    addOrder,
    getComments,
    delComment,
} = require("../controllers/userControllers");
const isAuth = require("../middleware/isAuth");
const {
    Validation,
    registerValidate,
    loginValidate,
    editProfile,
} = require("../middleware/validateUser");
const User = require("../models/User");
const router = express.Router();

//get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({ userType: false });
        res.status(200).send({ msg: "list of users", users });
    } catch (error) {
        console.log(error);
        res.status(500).send({ errors: [{ msg: "user is not be saved" }] });
    }
});

/*
@method: POST
@ path:http:localhost:5000/api/user/register
@ parameter: req.body  
public
*/
router.post("/register", registerValidate(), Validation, Register);

/*
@method: POST
@ path:http:localhost:5000/api/user/login
@ parameter: req.body  
public
*/
router.post("/login", loginValidate(), Validation, Login);

/*
@method: GET
@ path:http:localhost:5000/api/user/current
@ parameter: req.headers  
public
*/
router.get("/current", isAuth, (req, res) => {
    res.send({ msg: "authorized", user: req.user });
});
//admin deleting user's comment
router.put("/delete/:id", delComment);

//post an item in the user
router.put("/:id", AddCart);

//update qty and price when we click on buttom +
router.put("/cart/:id", updateCart);

//update qty and price when we click on buttom -
router.put("/cartminus/:id", UpdateCart);

//edit profile
router.put("/profile/:id", EditProfile);

//post comments
router.put("/comments/:id", postComment);

// get comments
router.put("/product/:id", getComment);

//delete comment
router.put("/comment/:id", deleteComment);

//delete item from cart list
router.put("/cart/delete/:id", removeItemUser);

//delete user
router.delete("/:id", removeUser);

router.get("/:id", getUser);

//add wish list
router.put("/favorite/:id", favoriteItem);

//remove wish list
router.put("/favorites/:id", favRemoveItem);

//add order
router.put("/order/:id", addOrder);

//get comments of all users
router.get("/comments", getComments);

//get wish list
// router.get("/favorite/:id", getfavoriteItem);

module.exports = router;
