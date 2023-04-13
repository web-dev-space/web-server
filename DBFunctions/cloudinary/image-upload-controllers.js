import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

const ImageController = (app) => {
    app.post('/upload_image', upload.single('image'), async (req, res) => {
        try {
            const filename = uuidv4();

            // Upload image to cloudinary using a buffer
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'image',
                        public_id: filename,
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                uploadStream.end(req.file.buffer);
            });
            res.status(200).json({ success: true, imageUrl: result.secure_url });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err?.message });
        }
    });
}

export default ImageController;
