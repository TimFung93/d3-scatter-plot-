const express = require('express');
const app = express();

const PORT = 5000;

app.use(express.static('public'))

app.listen(PORT, () => {
	console.log("server started on port " + PORT)
	console.log('press CTRL + C to kill server')
})