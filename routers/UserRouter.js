const express = require("express");
const router = express.Router();
const Product = require("../models/ProductSchema")
const Cart = require("../models/CartSchema")
const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config();

router.get("/", async (req, res) => {
    // res.cookie("hello", "hello")
    return res.send("hello")
})

router.post("/signup", async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        if (user) {
            return res.status(500).send({ message: "Email Already Exist" });
        }

        user = await User.create(req.body);

        res.send({ user });
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password, } = req.body;
    if (!email || !password) {
        return res.status(402).send({ message: "Please fill all data0" })
    }
    // res.cookie("ketan123", "ketan123")
    // console.log("ketan");
    try {
        let token;
        const userLogin = await User.findOne({ email: req.body.email });

        if (!userLogin) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const match = await bcrypt.compare(password, userLogin.password)

        if (!match) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        token = await userLogin.generateAuthToken()
        console.log(token);
        console.log('Cookies: ', req.cookies)
        res.cookie("jwtToken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        })
        // res.cookie("ketan123", "ketan123")

        // return res.cookie("jwtToken", token, { expires: new Date(Date.now() + 25892000000), httpOnly: true }).status(201).send({ message: "login succesfull" })
        return res.status(201).send({ message: "login succesfull" });
        // res.send({ user, token, status });
    } catch (e) {
        return res.status(401).send(e.message);
    }
});

router.get("/Product", async (req, res) => {
    try {
        const data = await Product.find().lean().exec();
        res.cookie("vikrant", "study")
        res.status(202).send(data)
    } catch (error) {
        res.status(401).send({ "message": error.message })
    }
});

router.get("/Product/:id", async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id }).lean().exec();
        return res.status(200).send({ product: product })
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
});


router.post("/Cart", async (req, res) => {

    try {
        const product = new Cart(req.body);

        await product.save();
        return res.status(200).json({ message: "succssefully added" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "not added" })
    }
});


router.get("/Cart", async (req, res) => {
    try {
        const data = await Cart.find().lean().exec();
        res.status(202).send(data)
    } catch (error) {
        res.status(401).send({ "message": error.message })
    }
});

router.delete("/Cart/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete({ _id: req.params.id }).lean().exec();

        return res.status(200).send({ product: product })
    } catch (error) {
        res.status(401).send({ "message": error.message })
    }
});


router.patch("/Cart/:id", async (req, res) => {
    try {
        const data = await Cart.findByIdAndUpdate(req.params.id, req.body).lean().exec();
        return res.status(200).send({ cart: data })
    } catch (error) {
        res.status(401).send({ "message": error.message })
    }
})

module.exports = router;