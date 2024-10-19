const adminModel = require('../models/adminModels/admin-model');
const { generateToken } = require("../utils/generateToken")
const { hashPassword } = require("../utils/encodedPassword")
const bcrypt = require("bcrypt");

module.exports.createAdmin = async (req, res) => {
    try {
        let existingAdmin = await adminModel.findOne({ email: req.body.email });
        if (existingAdmin) {
            return res.status(400).send("Email already exists");
        }

        let { name, email, password } = req.body;
        let hashedPassword = await hashPassword({ password }, res);

        if (!hashedPassword) {
            return;
        }


        try {
            let user = await adminModel.create({ name, email, password: hashedPassword });

            res.status(201).send({
                message: "User registered successfully",
                user
            });
        } catch (error) {
            return res.status(500).send(error.message);
        }


    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports.adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await adminModel.findOne({ email: email });
        if (!user)
            return res.status(401).send("Invalid email or password");

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            let token = generateToken(user);
            res.cookie("token", token, { httpOnly: true, secure: true });  
            return res.status(200).send({
                message: "Login successful",
                token
            });
        }

        return res.status(401).send("Invalid password");

    } catch (err) {
        res.send(err.message)
    }

}
