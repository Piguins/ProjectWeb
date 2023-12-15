const user = require("../models/users.model");
var jwt = require("jsonwebtoken");
var Cookies = require("cookies-js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class LoginController {
  index(req, res, next) {
    res.render("login", { loginform: true, addProcessing: true });

  }
  googleauth(req, res, next) {

    user.find({ email: req.cookies.userProfile.email }).then((docs) => {
      if (docs.length === 0) {
        const NewUser = new user({

          email: req.cookies.userProfile.email,
          fullName: req.cookies.userProfile.name,
          role: "user",
        });

        NewUser.save();
        const token = jwt.sign({ name: NewUser.email }, "fiat");
        res.cookie("id", NewUser._id);
        res.cookie("token", token);
        res.cookie("avatar", NewUser.avatar);
        res.cookie("username", NewUser.fullName);
        res.cookie("role", NewUser.role);
        res.cookie("email", NewUser.email);
        res.redirect("/");
      }
      else {


        const token = jwt.sign({ name: req.cookies.userProfile.email }, "fiat");
        res.cookie("id", docs[0]._id);
        res.cookie("token", token);
        res.cookie("avatar", docs[0].avatar);
        res.cookie("username", docs[0].fullName);
        res.cookie("role", docs[0].role);
        res.cookie("email", docs[0].email);
        res.cookie("phone", docs[0].phoneNumber);
        if (docs[0].avatar === undefined) {
          res.redirect("/user/setavatar");
        } else {
          res.redirect("/");
        }

      }
    });
  }

  async checkEmail(req, res, next) {
    await user.find({ email: req.body.username }).then((docs) => {
      if (docs.length === 0) {
        res.render("login", {
          message: "tài khoản chưa  được đăng kí",
          announce: true,
          addProcessing: true
        });
      }
    });
    next();

  }

  login(req, res, next) {
    user
      .findOne({
        email: req.body.username,
      })
      .then((data) => {

        if (data) {
          bcrypt.compare(req.body.password, data.password).then(function (result) {
            if (result) {
              const token = jwt.sign({ name: req.body.username }, "fiat");
              res.cookie("id", data._id);
              res.cookie("token", token);
              res.cookie("avatar", data.avatar);
              res.cookie("username", data.fullName);
              res.cookie("password", data.password);
              res.cookie("role", data.role);
              if (data.avatar === undefined) {
                res.redirect("/user/setavatar");
              } else {
                res.redirect("/");
              }
            } else {
              res.render("login", {
                message: "sai mật khẩu",
                announce: true,
                addProcessing: true
              });
            }
          });
        } else {
          res.render("login");
        }
      })
      .catch((err) => console.log(err));
  }
}
module.exports = new LoginController();
