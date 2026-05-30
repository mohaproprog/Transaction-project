import User from "../module/user.js";
import { generateToken } from "../utils/generateToken.js";


export const register = async (req, res,next) => {
    try {
        const { name, email, password, role,profilePic } = req.body;

        const emailLower = email.toLowerCase();

        const existingUser = await User.findOne({ email: emailLower });

        if (existingUser) {
            return res.status(400).json({
                message: "this email is already used"
            });
        }

        const user = await User.create({
            name,
            email: emailLower,
            password,
            role,
            profilePic
        });

        const token =  generateToken(user._id)

        res.status(201).json({
            message: "user created",
            user,
            token
        });

    } catch (error) {
        next(error)
    }
};
export const login = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        const emailLower = email.toLowerCase();

        const existingUser = await User.findOne({ email: emailLower });

        if (!existingUser || !(await existingUser.comparePassword(password))) {
            return res.status(400).json({
                message: "your email or password is incorrect"
            });
        }

        // remove password safely
        const user = await User.findOne({email:emailLower}).select("-password");

        const token = generateToken(existingUser._id);

        res.status(200).json({
            message: "user logged",
            user,
            token
        });

    } catch (error) {
        next(error)
    }
};

