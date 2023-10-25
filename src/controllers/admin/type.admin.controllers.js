const type = require("../../models/type.model");
var Cookies = require("cookies-js");
class addType {
    index(req, res, next) {
        res.render("addtype",{hideNavigation:true});
    }
    add(req, res, next) {

      

        const name = req.body.name;
        const routename= req.body.routeName;
        const newType = new type({
            name: name,
            routeName: routename,
            img:req.file.path

        });
        newType.save();
        res.redirect("/");
    }

}
module.exports = new addType();
