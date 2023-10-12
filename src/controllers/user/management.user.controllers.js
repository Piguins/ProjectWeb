var Cookies = require("cookies-js");
const Product = require("./../models/product.model");
class Management {
    index(req, res, next) {
        if (req.cookies.role === "admin") {

            Product.find({}).then(items => {
                items = items.map((item) => item.toObject());

                res.render("management", { items });
            }).catch((err) => res.json(err));


        }
        else {
            res.json("you are not an admin");
        }

    }
    delete(req, res, next) {
        Product.deleteOne({ _id: req.params.id }).then(e => {
            console.log("xoa duoc r ");
            res.redirect("/management");
        }).catch(e => {
            console.log("err" + e);
        })
    }
    edit(req, res, next) {

        Product.findByIdAndUpdate(req.body.id, { name: req.body.name, price: req.body.price }).then(e => {
            res.redirect("/management");
        }).catch(err => {
            console.log(err);
        })
    }
}
module.exports = new Management();
