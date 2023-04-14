import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import Busboy from 'busboy';

const ImageController = (app) => {
    app.post('/upload_image', async (req, res) => {
        try {
            const busboy = Busboy({ headers: req.headers });
            const filename = uuidv4();
            let bufferData = Buffer.from('');

            busboy.on('file', (_, file) => {

                file.on('data', (data) => {
                    bufferData = Buffer.concat([bufferData, data]);
                });

                file.on('end', async () => {
                    try {
                        const result = await cloudinary.uploader.upload_stream(
                            {
                                resource_type: 'image',
                                public_id: filename,
                            },
                            (error, result) => {
                                if (error) {
                                    console.log(error);
                                    return res.status(400).json({ message: error?.message });
                                } else {
                                    return res.status(200).json({ success: true, imageUrl: result.secure_url });
                                }
                            }
                        ).end(bufferData);
                    } catch (err) {
                        console.log(err);
                        res.status(400).json({ message: err?.message });
                    }
                });

            });

            req.pipe(busboy);

        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err?.message });
        }
    });
}

export default ImageController;
