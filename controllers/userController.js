const userService = require("../services/userServices");

const register = async (req, res) => {
    try{
        const userData = req.body;
        const user = await userService.registerUser(userData);
        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const login = async (req, res) => {
    try {
        const userData = req.body;
        const {token, userId} = await userService.loginUser(userData);
        res.status(200).json({
            message: "User logged in successfully",
            token,
            userId
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


module.exports = {register, login};