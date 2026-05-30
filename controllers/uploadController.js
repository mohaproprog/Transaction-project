import cloudinary from "../utils/cloudinary.js";
import User from "../module/user.js";

export const uploadFile = async (req, res, next) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "profile_picture",
                resource_type: "image"
            },

            async (err, result) => {

                if (err) {
                    return next(err);
                }

                await User.findByIdAndUpdate(
                    req.user._id,
                    {
                        profilePic: result.secure_url
                    }
                );

                res.status(201).json({
                    message: "Profile picture uploaded successfully",
                    url: result.secure_url
                });

            }
        );

        stream.end(req.file.buffer);

    } catch (error) {
        next(error);
    }

};