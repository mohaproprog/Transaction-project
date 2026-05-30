import jwt from "jsonwebtoken";
import User from "../module/user.js";

const protect = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        // 1️⃣ Check header exists
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "no authorization token provided"
            });
        }

        // 2️⃣ Extract token
        const token = authorization.split(" ")[1];

        // 3️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        if (!decoded) {
            return res.status(401).json({
                message: "invalid token"
            });
        }
        
        

        // 4️⃣ Get user from DB
        const user = await User.findById(decoded.userId).select("-password");

        

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        // 5️⃣ Attach user to request
        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "token expired or invalid",
            error: error.message
        });
    }
};

export default protect;