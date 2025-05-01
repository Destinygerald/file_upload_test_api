const express = require('express')
const cors = require('cors')
const Dropbox = require('dropbox').Dropbox
const multer = require('multer')
const fs = require('fs')
require('dotenv').config()

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN })

const app = express()

const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
      }
 })


app.use(express.json())
app.use(express.static('uploads'))
app.use(cors({
	origin: '*',
	credentials: true	
}))


app.post('/image', upload.single('image'), async(req, res) => {
    try {
        const imageName = req.file.originalname;

        const dropboxPath = `/uploads/${imageName}`;
        
        const response = await dbx.filesUpload({
            path: dropboxPath,
            contents: req.file.buffer,
            mode: {'.tag': 'overwrite'},
            autorename: true,
            mute: false
        });

        return res.status(200).json({ 
            message: 'Image uploaded successfully',
            data: response 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error uploading image', error: error });
    }
})

app.get('/image/:id', async(req, res) => {
    try {
        const { id } = req.params

        const response = await dbx.filesDownload({ path: id });
        const fileBinary = response.result.fileBinary;
        const fileName = response.result.name;

        // Detect MIME type (basic)
        let contentType = 'application/octet-stream';
        if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) contentType = 'image/jpeg';
        else if (fileName.endsWith('.png')) contentType = 'image/png';
        else if (fileName.endsWith('.gif')) contentType = 'image/gif';

        res.setHeader('Content-Type', contentType);
        return res.send(fileBinary);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error uploading image', error: error });
    }
})

app.delete('/image/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!id || !id.startsWith('id:')) {
        return res.status(400).json({
            err: 'A valid Dropbox file ID is required (e.g., "id:abc123...").'
        });
    }
  
    try {
      const result = await dbx.filesDeleteV2({ path: id }); // path can be an ID
  
      res.status(200).json({
        message: 'File deleted successfully',
        metadata: result.result.metadata
      });
    } catch (error) {
      console.error('Dropbox delete error:', error);
        res.status(500).json({
            err: 'Failed to delete file'
        });
    }
  });

module.exports = app