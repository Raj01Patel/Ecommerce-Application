const UserModel = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const signUp = async (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password,salt);

    const newlyInsertedUser = await UserModel.create({
        ...req.body,
        password:hashedPassword,
        role: "CUSTOMER"
    });
    console.log(newlyInsertedUser);
    res.json({
        success: true,
        message: "Registration completed, Pls login to continue",
    })
}

const login = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid email ID or password",
        })
    }
    
    const isPasswordSame = await bcrypt.compare(req.body.password,user.password)
    if (!isPasswordSame) {
        return res.status(400).json({
            success: false,
            message: "Invalid password",
        })
    }

    
    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    const expiryTimeInSeconds = currentTimeInSeconds + 3600; // 1hr from now
    
    const jwtPayload = {
        userId: user._id,
        role: user.role,
        mobileNo: user.mobileNo,
        exp: expiryTimeInSeconds,
    };

    const token = jwt.sign(jwtPayload, "MY_SECRET_KEY")
    await UserModel.findByIdAndUpdate(user._id, { $set: { token } });

    res.json({
        success: true,
        message: "Login Successfully",
        token: token,
    })
}

const userController = {
    signUp,
    login
}

module.exports = userController;