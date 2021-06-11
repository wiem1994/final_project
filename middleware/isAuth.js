const User = require("../models/User");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    try {
        //    import token
        // headers=> authorization
        const token = req.headers["authorization"];

        //   si y a pas un token
        if (!token) {
            // you are not authorized
            return res.status(401).send({
                errors: [{ msg: "you are not authorized, token problem" }],
            });
        }

        // on doit verifie si token est valide en décodant le token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // test if the user exist with that id
        const user = await User.findOne({ _id: decoded.id }).select(
            "-password"
        );
        if (!user) {
            // you are not authorised
            return res.status(401).send({
                errors: [
                    {
                        msg: "you are not authorized, you are not a user yet",
                    },
                ],
            });
        }

        // si non
        // req va ajouter un user
        req.user = user;
        // next
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            errors: [{ msg: "you are not authorized, server problem" }],
        });
    }
};

module.exports = isAuth;
