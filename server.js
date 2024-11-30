const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const upload = require('./multerConfig');
const multer = require('multer')
const path = require('path');


const PORT = process.env.PORT || 5000





const app = express()
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes)
app.use('/api/employee', employeeRoutes)


app.listen(8000, () => console.log(`Server running on port ${PORT}`))