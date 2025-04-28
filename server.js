const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},

	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})
const upload = multer({ storage })


app.use(express.json())
app.use(express.static('uploads'))
app.use(cors({
	origin: '*',
	credentials: true	
}))

app.post('/image', upload.single('image'), async(req, res) => {
	try {

        const { path, filename } = req.file
        
        return res.status(201).json({
            status: 'Created',
            data: {
                path,
				filename
            },
            message: 'Successfully Uploaded Image'
        });  
    } catch (err) {
        return res.status(500).json({
            'error': err
        })
    }
})


module.exports = app