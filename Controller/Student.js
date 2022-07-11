const db = require('../Model/')
const student = db.student
export const regsiter = (req, res) => {
    const { name, email } = req.body
    student.findOne({ name: name }, (err, match) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        if (match) {
            res.status(500).send({ message: "Email has Already Registered" })
            return
        } else {
            const students = new student({
                email: email,
                name: name,


            })
            students.save().then(() => res.status(200).send({ message: "Student Registered" })).catch(err => {
                res.status(500).send(err)
                return
            })
        }
    })
}
export const getstudent = (req, res) => {
    student.find({}, (err, student) => {
        if (err) {
            res.status(500).send({ message: err })
        }
        if (student) {
            res.status(200).send({ student: student })
        } else {
            res.status(500).send({ message: "No Students" })
        }
    })
}
export const updatestudent = (req, res) => {
    const { user, id } = req.body
    student.findOneAndUpdate({ _id: id }, { name: user.name, email: user.email }, (err, usr) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (usr) {
            res.status(200).send({ message: "Updated Successful" })
        } else {
            res.status(500).send({ message: "No User Found" })
        }
    })
}
export const deletestudent = (req, res) => {
    const { id } = req.body
    student.findOneAndDelete({ _id: id }, (err, stu) => {
        if (err) {
            res.status(500).send({ message: err })
        }
        if (stu) {
            res.status(200).send({ message: "Deleted" })
        }
    })
}