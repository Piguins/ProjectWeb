const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class Resister {
  index(req, res, next) {
    res.render("register",{addProcessing:true});
  }
  async checkEmailExist(req, res, next) {
    await User.find({ email: req.body.email })
      .then((docs) => {
        if (docs.length) {
          res.render("register", {
            message: "gmail đã được đăng kí",
            announce: true,
          });
        }
      })
      .catch((err) => console.log(err));
    next();
  }

  load(req, res, next) {
    const pw = req.body.password;
    const role=(req.body.email==="bothofuscando@gmail.com")?"admin":"user";
    let lowerCase = new RegExp("(?=.*[a-z])");
    let upperCase = new RegExp("(?=.*[A-Z])");
    let number = new RegExp("(?=.*[0-9])");
    let eightChar = new RegExp("(?=.{8,})");

    if (
      eightChar.test(req.body.password) &&
      lowerCase.test(req.body.password) &&
      upperCase.test(req.body.password) &&
      number.test(req.body.password)
    ) {
      if (req.body.password === req.body.passwordChecking) {
        bcrypt.hash(pw, saltRounds).then(function (hash) {
          const NewUser = new User({
            password: hash,
            email: req.body.email,
            fullName: req.body.fullName,
            role: role,
          });

          NewUser.save();
        });

        res.redirect("/login");
      } else {
        res.render("register", {
          data: req.body,
          announce: true,
          message: "nhập lại mật khẩu sai",
        });
      }
    }
    res.render("register", {
      announce: true,
      message:
        "Tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường và một số:",
    });
  }
}
module.exports = new Resister();
