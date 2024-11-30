const bcrypt = require('bcryptjs')
const Employee = require('../models/Employee')
const upload = require('../multerConfig');


const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees)
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}


// Create a new Emp

const createEmployee = async (req, res) => {
    try {
        const { username, email, password, mobile, designation, gender, courses, image } = req.body

        if (!username || !email || !password || !mobile || !designation || !gender || !courses || !image) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const exsistingEmployee = await Employee.findOne({ email });

        if (exsistingEmployee) {
            return res.status(400).json({ message: "Employee with this email already exists." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newEmployee = new Employee({
            username,
            email,
            password: hashedPassword,
            mobile,
            designation,
            gender,
            courses,
            image,
        })
        await newEmployee.save();


        res.status(201).json({
            message: 'Employee created successfully!',
            employee: {
                name: newEmployee.username,
                email: newEmployee.email,
                mobile: newEmployee.mobile,
                designation: newEmployee.designation,
                gender: newEmployee.gender,
                courses: newEmployee.courses,
                image: newEmployee.image,
            },
        })

    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

// get user by id

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Employee.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data" });
    }

}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, mobile, designation, gender, courses, image } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, mobile, designation, gender, courses, image },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user data" });
    }

}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

const employeeCount = async (req, res) => {
    try {
        const count = await Employee.countDocuments(); // Mongoose method to count documents
        res.status(200).json({ totalCount: count });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Server error' });
    }
}







module.exports = { createEmployee, getAllEmployees, getUserById, updateUser, deleteUser, employeeCount };