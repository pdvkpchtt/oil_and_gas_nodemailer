const express = require("express");
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
      host: "smtp.yandex.ru",
      port: "465",
      auth: {
        user: "yndx-kabirov-d@yandex.ru",
        pass: "epehdzfdajtkjshr",
      },
    });

    const mailOptions = {
      from: "yndx-kabirov-d@yandex.ru",
      to: "ssc-solutions@yandex.ru",
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
    res.send({ status: "bad" });
  }
});

server.listen(9000, () => console.log(`server listening on port 9000`));
