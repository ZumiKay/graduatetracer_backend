import { answer, form } from "../Model"

export const createForm = (req, res) => {
    const { title, content } = req.body

    form.findOne({ title }, (err, match) => {
        if (err) {
            return res.status(500).json({ message: err })
            
        }
        if (match) {
            return res.status(500).json({ message: "Form Title Existed Please Change" })
        } else {
            const survey = new form({
                title: title,
                contents: content
            })
            survey.save().then(() => {
                form.findOne({ title }, (err, sur) => {
                    if (sur) {
                        return res.status(200).json({ data: sur })
                    }
                })
            }).catch((error) => res.status(500).json({message: error}))

        }
    })

}
export const updateForm = (req, res) => {
    const { id, title, content } = req.body

    form.findByIdAndUpdate(id, { title: title, contents: content }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err })
        }
        if (result) {
            return res.status(200).json({ message: "Survey Updated" })
        } else {
            return res.status(500).json({ message: "Survey not found" })
        }
    })


}
export const deleteForm = (req, res) => {
    const { id } = req.body
    form.findOneAndDelete({ _id: id }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err })
            
        }
        if (result) {
            answer.deleteMany({ Form_id: id }).then(() => {
                return res.status(200).json({ message: "Survey Deleted" })
            })

        } else {
            return res.status(500).json({ message: "Survey not found" })
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
        return res.status(200).json({ message: "Answer Saved" })
    }).catch(err => {
        return res.status(500).json({ message: err })
    })
}
export const getAnswerset = (req, res) => {
    const { formid } = req.params
    answer.find({ Form_id: formid }, (err, ans) => {
        if (err) {
            return res.status(500).json({ message: err })
            
        }
        if (ans) {
            return res.status(200).json({ answer: ans })
        } else {
            return res.status(500).json({ message: "There are no answer yet" })
        }
    })

}
export const getForm = (req, res) => {

    form.find({}, (err, survey) => {
        if (err) {
            return res.status(500).json({ message: err })
        }
        if (survey) {
            return res.status(200).json({ survey: survey })
        } else {
            return res.status(500).json({ message: "Survey not exist" })
        }

    })
}