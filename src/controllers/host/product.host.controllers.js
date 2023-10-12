const productData = require("../../models/product.model");
const type = require("../../models/type.model");
const user = require("../../models/users.model");
var Cookies = require("cookies-js");
class addProduct {
    displayProductAddingForm(req, res, next) {
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

                res.render("addProduct", { items, hideNavigation: true, process: 0 });
            })
            .catch((err) => res.json(err));


    }

    displayProductAddingForm1(req, res, next) {

        res.render("addProduct1", { hideNavigation: true, process: 33 });
    }

    displayProductAddingForm2(req, res, next) {
        res.render("addProduct2", { hideNavigation: true, process: 66 });
    }
    saveDataFromForm(req, res, next) {
        res.cookie("name", req.body.name);
        res.cookie("type", req.body.type);
        res.redirect("/host/addproduct/secondstep");
    }
    saveDataFromForm1(req, res, next) {

        res.cookie("startday", req.body.startday);
        res.cookie("endday", req.body.endday);
        res.cookie("maximumcus", req.body.maximumcus);
        res.cookie("price", req.body.price);
        res.cookie("hosthome", req.body.hosthome);
        res.cookie("bed", req.body.bed);
        res.cookie("shower", req.body.shower);

        res.redirect("/host/addproduct/thirdstep");
    }
    saveNewProduct(req, res, next) {

        const love = req.files.map(e => e.path);   

        user.find({ _id: req.cookies.id })
            .then((user) => {

                const newProduct = new productData({
                    name: req.cookies.name,
                    host: user[0],
                    startday: req.cookies.startday,
                    endday: req.cookies.endday,
                    maximuncus: req.cookies.maximumcus,
                    price: req.cookies.price,
                    type: req.cookies.type,
                    bed: req.cookies.bed,
                    shower: req.cookies.shower,
                    hosthome: req.cookies.hosthome,
                    img: love,
                    display: love[0].path,
                    validByAdmin:true
                });
                newProduct.save();


            })
            .catch((err) => res.json(err));

        res.clearCookie("name");
        res.clearCookie("startday");
        res.clearCookie("endday");
        res.clearCookie("img");
        res.clearCookie("type");
        res.clearCookie("bed");
        res.clearCookie("shower");
        res.clearCookie("hosthome");
        res.clearCookie("price");
        res.clearCookie("maximumcus");
        res.clearCookie("display");

        res.redirect("/");
    }
    overView(req,res,next){
        res.render("Overview" ,{ hideNavigation: true});
    }
}
module.exports = new addProduct();
