const { Storage } = require('@google-cloud/storage');

// Initialize the google cloud storage client
const storage = new Storage({
    keyFilename: process.env.KEYFILENAME,
    projectId: process.env.PROJECT_ID,
});
const bucket = storage.bucket(process.env.BUCKET_NAME);

// Upload a new image
const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const { buffer, originalname } = req.file;
    const fileName = `${Date.now()}_${originalname}`;
    const file = bucket.file(fileName);

    // Upload image to Google Cloud Storage
    try {
        await file.save(buffer, {
            contentType: req.file.mimetype,
            public: true, // Make file publicly accessible
        });

        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        return res.status(200).json({ fileUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error uploading file.');
    }
};

// Get image by Id
const getImageById = async (req, res) => {
    const { id } = req.params;  // Get the ID from the request parameters

    const file = bucket.file(id);  // Use the ID as the file name

    // Check if the file exists
    try {
        const [exists] = await file.exists();
        if (!exists) {
            return res.status(404).send('File not found.');
        }

        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${id}`;
        return res.status(200).json({ fileUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error retrieving file.');
    }
};

module.exports = { uploadImage, getImageById };
