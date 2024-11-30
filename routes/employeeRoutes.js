const express = require('express');
const router = express.Router();
const { createEmployee, getAllEmployees, getUserById, updateUser, deleteUser, employeeCount } = require('../controllers/employeeController')
const upload = require('../multerConfig')


router.get('/', getAllEmployees)

router.get('/emp/:id', getUserById)

router.put('/emp/:id', updateUser)

router.post('/create', upload.single('image'), createEmployee);

router.delete('/delete/:id', deleteUser)

router.get('/count', employeeCount)

module.exports = router;