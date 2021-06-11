console.clear();
const express = require("express");
const connectDB = require("./config/connectDB");
const router = require("./routes/user");
const Router = require("./routes/item");
const path = require("path");

// instance app
const app = express();
connectDB();

//use routes
app.use(express.json());
app.use("/api/user", router);
app.use("/api/item", Router);

// serve static assets if we're in production
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    require("dotenv").config();
}

const port = process.env.PORT;
//create server using the method listen
app.listen(port, (err) =>
    err ? console.log(err) : console.log(`server is running on port ${port}`)
);
