var Cookies = require("cookies-js");
class LogOutController {
    index(req, res, next) {
        res.clearCookie("token");
        res.clearCookie("id");
             res.clearCookie("evaluate",NewUser.numberOfjudgement);
          res.clearCookie("address", NewUser.address);
        res.clearCookie("avatar");
        res.clearCookie("role");
        res.clearCookie("username");
        res.clearCookie("phone");
        res.clearCookie("password");
        res.render("login", { user: {}, hideNavigation: true });

    

    }
}
module.exports = new LogOutController();
