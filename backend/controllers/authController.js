const { User } = require("../models/user");
const bcrypt = require("bcrypt");
require('jsonwebtoken');

async function login(req, res) {
    try {
        // validate request body
        const { error } = validateUserLogin(req.body);
        if (error) 
            return res.status(400).send({ success: false, message: error.details[0].message });

        // find user by email
        const user = await User.findOne({email: req.body.email});
        if (!user) 
            return res.status(401).send({ success: false, message: "Invalid email or password" });

        // validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ success: false, message: "Invalid email or password" });

        // generate JWT token
        const token = user.generateAuthToken();
        res.status(200).send({ success: true, data: token, message: "User logged in successfully" });
    } 
    catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}

module.exports = { login };
