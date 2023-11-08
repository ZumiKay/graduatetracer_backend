const db = require('../Model/')
const student = db.student
export const regsiter = (req, res) => {
    const { name, email } = req.body
    student.findOne({ name: name }, (err, match) => {
        if (err) {
            return res.status(500).json(err)
            
        }
        if (match) {
            return res.status(500).json({ message: "Email has Already Registered" })
            
        } else {
            const students = new student({
                email: email,
                name: name,


            })
            students.save().then(() => res.status(200).send({ message: "Student Registered" })).catch(err => {
               return res.status(500).json(err)
                
            })
        }
    })
}
export const getstudent = (req, res) => {
    student.find({}, (err , student) => {
        if (err) {
           return res.status(500).json({ message: err })
        }
        if (student) {
            return res.status(200).json({ student: student })
        } else {
           return res.status(500).json({ message: "No Students" })
        }
    })
}
export const updatestudent = (req, res) => {
    const { user, id } = req.body
    student.findOneAndUpdate({ _id: id }, { name: user.name, email: user.email }, (err, usr) => {
        if (err) {
            return res.status(500).send({ message: err })
            
        }
        if (usr) {
            return res.status(200).send({ message: "Updated Successful" })
        } else {
            return res.status(500).send({ message: "No User Found" })
        }
    })
}
export const deletestudent = (req, res) => {
    const { id } = req.body
    student.findOneAndDelete({ _id: id }, (err, stu) => {
        if (err) {
            return res.status(500).json({ message: "Error Occured" })
        }
        if (stu) {
           return res.status(200).json({ message: "Student Deleted" })
        }
    })
}