const type = require("../models/type.model");
var Cookies = require("cookies-js");
class addType {
    index(req, res, next) {
        res.render("addType");
    }
    add(req, res, next) {

        const name = req.body.name;
        const newType = new type({
            name: name
        });
        newType.save();
        res.redirect("/");
    }

}
module.exports = new addType();
