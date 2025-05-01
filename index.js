const app = require('./server.js')
// connect database will be done here too.

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
	console.log('Listening to Port ', PORT)
})

// {
// 	destination: function (req, file, cb) {
// 		cb(null, './uploads')
// 	},

// 	filename: function (req, file, cb) {
// 		cb(null, Date.now() + '-' + file.originalname)
// 	}
// }