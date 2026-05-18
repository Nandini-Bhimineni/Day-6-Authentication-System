const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// REGISTER API
router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;


        // EMPTY FIELD VALIDATION
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // EMAIL VALIDATION
        if (!email.includes("@")) {
            return res.status(400).json({
                message: "Invalid Email Format"
            });
        }


        // PASSWORD VALIDATION
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }


        // CHECK USER EXISTS
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);


        // CREATE USER
        const user = new User({
            name,
            email,
            password: hashedPassword
        });


        // SAVE USER
        await user.save();


        // SUCCESS RESPONSE
        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});



// LOGIN API
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        // EMPTY VALIDATION
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // FIND USER
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }


        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }


        // GENERATE TOKEN
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );


        // SUCCESS RESPONSE
        res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});



// PROTECTED ROUTE
router.get("/profile", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
});


module.exports = router;