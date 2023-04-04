const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const userRouter = express.Router();

userRouter.get("/sing", async (request, response) => {
  const { name, email, pass, num } = request.body;
  try {
    const user = await UserModel.find({ name, email, pass, num });
    response.send(user);
    response.send("sign succssesfull")
  } catch (err) {
    console.log("something went rwong");
    console.log(err);
  }
});

userRouter.post("/sing", async (request, response) => {
  const { name, email, pass, num } = request.body;
  try {
    bcrypt.hash(pass, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, pass: secure_pass, num });
        await user.save();
        response.send(user);
      }
    });
  } catch (err) {
    console.log("something rwong");
    console.log(err);
  }
});

userRouter.get("/login", async (requset, response) => {
  const data = requset.body;
  try {
    const user = await UserModel.find();
    response.send(user);
  } catch (err) {
    console.log("error");
    console.log(err);
  }
});

userRouter.post("/login", async (request, response) => {
  const { email, pass } = request.body;
  try {
    const user = await UserModel.find({ email });
    console.log(user);

       await user.save()
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId:user[0]._id }, process.env.key);
          response.send({ msg: "login successfull", "token": token });
        } else {
          response.send("rwong creatensial");
        }
      });
    } else {
      response.send("rwong creatensial");
    }
  } catch (err) {
    console.log("error");
    console.log(err);
  }
});

module.exports = {
  userRouter,
};
