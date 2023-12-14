const productData = require("../models/product.model");
const type = require("../models/type.model");
const user = require("../models/users.model");
var Cookies = require("cookies-js");
class addProduct {
    index(req, res, next) {
        let isAdmin = false;
        if (!req.cookies.token) {
            res.redirect("/login");
        }
        if (req.cookies.role) {
            isAdmin = req.cookies.role === "admin" ? true : false;
        }
        else { isAdmin = false; }
        type.find({ gender: req.params.gender })
            .then((items) => {
                items = items.map((item) => item.toObject());

                res.render("addProduct", { items, addProcessing: true });
            })
            .catch((err) => res.json(err));


    }

    index1(req, res, next) {

        res.render("addProduct1", { addProcessing: true });
    }

    index2(req, res, next) {
        res.render("addProduct2", { addProcessing: true });
    }