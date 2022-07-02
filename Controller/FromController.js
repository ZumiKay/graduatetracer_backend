import { answer, form } from "../Model"

export const createForm = (req, res) => {
    const { title, content } = req.body

    form.findOne({ title }, (err, match) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (match) {
            res.status(500).send({ message: "Form Title Existed Please Change" })
        } else {
            const survey = new form({
                title: title,
                contents: content
            })
            survey.save().then(() => {
                form.findOne({ title }, (err, sur) => {
                    if (sur) {
                        res.status(200).send({ data: sur })
                    }
                })
            })

        }
    })

}
export const updateForm = (req, res) => {
    const { id, title, content } = req.body

    form.findByIdAndUpdate(id, { title: title, contents: content }, (err, result) => {
        if (err) {
            res.status(500).send({ message: err })
        }
        if (result) {
            res.status(200).send({ message: "Survey Updated" })
        } else {
            res.status(500).send({ message: "Survey not found" })
        }
    })


}
export const deleteForm = (req, res) => {
    const { id } = req.body
    form.findOneAndDelete({ _id: id }, (err, result) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (result) {
            answer.deleteMany({ Form_id: id }).then(() => {
                res.status(200).send({ message: "Survey Deleted" })
            })

        } else {
            res.status(500).send({ message: "Survey not found" })
        }
    })

}
export const createAnswer = (req, res) => {
    const { userIP, formid, Response } = req.body
    const Ans = new answer({
        user: userIP,
        Form_id: formid,
        Responses: Response,


    })
    Ans.save().then(() => {
        res.status(200).send({ message: "Answer Saved" })
    }).catch(err => {
        res.status(500).send({ message: err })
    })
}
export const getAnswerset = (req, res) => {
    const { formid } = req.params
    answer.find({ Form_id: formid }, (err, ans) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        if (ans) {
            res.status(200).send({ answer: ans })
        } else {
            res.status(500).send({ message: "There are no answer yet" })
        }
    })

}
export const getForm = (req, res) => {

    form.find({}, (err, survey) => {
        if (err) {
            res.status(500).send({ message: err })
            return

        }
        if (survey) {
            res.status(200).send({ survey: survey })
        } else {
            res.status(500).send({ message: "Survey not exist" })
        }

    })
}