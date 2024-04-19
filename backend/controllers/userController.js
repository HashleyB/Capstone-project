const { User, validateUserRegistration } = require("../models/user");
const bcrypt = require("bcrypt");

async function register(req, res) {
    try {
        // validate request body
        const { error } = validateUserRegistration(req.body);
        if (error) 
            return res.status(400).send({ success: false, message: error.details[0].message });

        // check if user already exists
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser)
            return res.status(400).send({ success: false, message: "User already registered" });

        // hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        await new User({...req.body, password: hashedPassword}).save();
        res.status(201).send({ success: true, message: "User registered successfully" });
    } 
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}

module.exports = { register };
