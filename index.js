const express = require("express");
const cors=require("cors")
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.route");
const { notesRouter } = require("./routes/Note.route");
const { authenticate } = require("./Middlewares/authentications.middlewares");
const app = express();
require('dotenv').config()
const port = process.env.port;

app.use(express.json());
app.use(cors({
  origin:"*"
}))


app.get("/", (req, res) => {
  res.send({ mag: "first file" });
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", notesRouter);


app.listen(port, async () => {
  try {
    await connection;
    console.log("port successfull");
  } catch (err) {
    console.log("somthing wrong");
  }
});
