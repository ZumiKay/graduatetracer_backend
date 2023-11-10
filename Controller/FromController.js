import { answer, form } from "../Model";
const nodemailer = require("nodemailer");
export const createForm = (req, res) => {
  const { title, content } = req.body;

  form.findOne({ title }, (err, match) => {
    if (err) {
      return res.status(500);
    }
    if (match) {
      return res
        .status(500)
        .json({ message: "Form Existed" });
    } else {
      const survey = new form({
        title: title,
        contents: content,
      });
      survey
        .save()
        .then(() => {
          form.findOne({ title }, (err, sur) => {
            if (sur) {
              return res.status(200).json({ data: sur });
            }
          });
        })
        .catch((error) => res.status(500));
    }
  });
};
export const updateForm = (req, res) => {
  const { id, title, content } = req.body;

  form.findByIdAndUpdate(
    id,
    { title: title, contents: content },
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (result) {
        return res.status(200).json({ message: "Survey Updated" });
      } else {
        return res.status(500).json({ message: "Survey not found" });
      }
    }
  );
};
export const deleteForm = (req, res) => {
  const { id } = req.body;
  form.findOneAndDelete({ _id: id }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (result) {
      answer.deleteMany({ Form_id: id }).then(() => {
        return res.status(200).json({ message: "Survey Deleted" });
      });
    } else {
      return res.status(500).json({ message: "Survey not found" });
    }
  });
};
export const createAnswer = (req, res) => {
  const { userIP, formid, Response } = req.body;
  const Ans = new answer({
    user: userIP,
    Form_id: formid,
    Responses: Response,
  });
  Ans.save()
    .then(() => {
      return res.status(200).json({ message: "Answer Saved" });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};
export const getAnswerset = (req, res) => {
  const { formid } = req.params;
  answer.find({ Form_id: formid }, (err, ans) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (ans) {
      return res.status(200).json({ answer: ans });
    } else {
      return res.status(500).json({ message: "There are no answer yet" });
    }
  });
};
export const getForm = (req, res) => {
  form.find({}, (err, survey) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (survey) {
      return res.status(200).json({ survey: survey });
    } else {
      return res.status(500).json({ message: "Survey not exist" });
    }
  });
};

const handleEmail = (data) => {
  return new Promise((resolve, reject) => {
    const { reciever, link, subject, message } = data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.email_pass,
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: reciever[0].join(", "),
      subject: subject,
      html: `<style>
      .email_container {
          background-color: black;
          width: 100%;
          height: 100%
          color: white
      }
      .email_container h2 {
        font-weight: 700;
    }
      .email_container h3 {
          font-weight: 600;
      }
      .email_container p {
          position: relative;
          bottom: 0;
          font-weight: 300;
          font-style: italic;
      }
  </style>
  <body>
      <div class="email_container">
          <h2>${message}</h2>
          <h3> Here is the link to the survey : <h3/>
          <a href='${link}'>${link}</h2>
      </div>
      <p>All Right Reserve Graduate Tracer @2022</p>
      </body>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

export const sendform = async (req, res) => {
  const { data } = req.body;

  try {
    await handleEmail(data);
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to send email" });
  }
};

