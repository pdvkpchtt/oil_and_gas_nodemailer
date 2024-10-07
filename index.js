const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");
// const pool = require("./db");

app.set("view engine", "ejs");
app.use(
  cors({
    origin: "https://ssc-solutions.ru",
    // origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json()); // из за этой строки я убил все нервные клетки

app.get("/", async (req, res) => {
  res.send("Hello mir");
});

app.post("/sendmail_shloos", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL,
      to: process.env.MAIL,
      subject: `Запрос от клиента`,
      html: `<div>
              <h1>Запрос от клиента</h1>

              <p>Компания:</p>
              <b>${req.body.compname}</b>

              <p>Имя:</p>
              <b>${req.body.name}</b>

              <p>Почта:</p>
              <b>${req.body.email}</b>

              <p>Телефон:</p>
               <b>${req.body.phone}</b>

              <p>Сообщение:</p>
               <b>${req.body.message}</b>
            </div>`,
    };

    await transporter.sendMail(mailOptions);

    res.send({ status: "good" });
  } catch (err) {
    console.log(err);
    res.send({ status: "bad" });
  }
});

server.listen(9000, () => console.log(`server listening on port 9000`));
