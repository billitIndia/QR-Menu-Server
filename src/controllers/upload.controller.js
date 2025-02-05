const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const AWS = require("aws-sdk");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Changed to India region
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

exports.generatePresignedUrl = async (req, res) => {
  try {
    const { fileType } = req.body;

    if (!fileType) {
      return res.status(400).json({ message: "File type is required" });
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const params = {
      Bucket: "billit-s3", // Changed to your actual bucket name
      Key: `menu-items/${fileName}`,
      ContentType: fileType,
      Expires: 300, // URL expires in 5 minutes
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    const publicUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

    res.json({
      uploadUrl,
      publicUrl,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ message: "Failed to generate upload URL" });
  }
};
