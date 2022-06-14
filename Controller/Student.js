const db = require('../Model/')
const student = db.student
export const regsiter = (req, res) => {
    const { firstname, lastname, email, department } = req.body
    student.findOne({ Email: email }, (err, match) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        if (match) {
            res.status(500).send({ message: "Email has Already Registered" })
            return
        } else {
            const students = new student({
                Email: email,
                Firstname: firstname,
                Lastname: lastname,
                Department: department
            })
            students.save().then(() => res.status(200).send({ message: "Student Registered" })).catch(err => {
                res.status(500).send(err)
                return
            })
        }
    })
}