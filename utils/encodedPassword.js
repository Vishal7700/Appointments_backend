const bcrypt = require("bcrypt");



const hashPassword = async (user, res) => {
    try {
        const salt = await bcrypt.genSalt(10); 
        const hash = await bcrypt.hash(user.password, salt); 
        return hash;
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


module.exports.hashPassword = hashPassword;