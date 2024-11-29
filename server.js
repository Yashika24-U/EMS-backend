const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000


const app = express()
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.listen(8000, () => console.log(`Server running on port ${PORT}`))