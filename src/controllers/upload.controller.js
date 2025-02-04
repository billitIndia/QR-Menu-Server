const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res, next) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000); // Current time
    const public_id = `qrmenu/${crypto.randomBytes(10).toString("hex")}`; // Unique ID

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        public_id,
        resource_type: "image",
      },
      process.env.CLOUDINARY_API_SECRET
    );

    return res.status(201).json({
      uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/qrnenu/upload`,
      public_id,
      api_key: process.env.CLOUDINARY_API_KEY,
      timestamp,
      signature,
    });
  } catch (error) {
    next(error);
  }
};
