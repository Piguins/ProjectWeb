const productData = require("../../models/product.model");
const type = require("../../models/type.model");
const user = require("../../models/users.model");
var Cookies = require("cookies-js");
class RoomController {
    //GET /host/room
    Index(req, res, next) {
        res.render("Overview", { hideNavigation: true });
    }
    //GET /host/room/title
    DisplayTitle(req, res, next) {
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

                res.render("roomTitle", { items, hideNavigation: true, process: 0 });
            })
            .catch((err) => res.json(err));


    }
//GET /host/room/detail
    DisplayDetail(req, res, next) {

        res.render("roomDetail", { hideNavigation: true, process: 25 });
    }
//GET /host/room/photos
    DisplayPhotos(req, res, next) {
        res.render("roomPhoto", { hideNavigation: true, process: 50 });
    }
    //GET /host/room/price
    DisplayPrice(req, res, next) {
        res.render("roomPrice", { hideNavigation: true, process: 75 });
    }
    //[POST]  /host/room/title
    SaveTitle(req, res, next) {
        res.cookie("name", req.body.name);
        res.cookie("type", req.body.type);
        res.redirect("/host/room/detail");
    }
    // [POST] /host/room/detail
    SaveDetail(req, res, next) {

        res.cookie("maximumcus", req.body.maximumcus);

        res.cookie("bed", req.body.bed);
        res.cookie("shower", req.body.shower);

        res.cookie("address", req.body.address);


        res.redirect("/host/room/photos");
    }
    // [POST] /host/room/photos
    SavePhotos(req, res, next) {
        const love = req.files.map(e => e.path);
        res.cookie("img", love);
        res.redirect("/host/room/price");
    }
    // [POST] /host/room/price
 async   SaveNewRoom(req, res, next) {
     await   user.findOne({ _id: req.cookies.id })
            .then((user) => {

            user.role="host"
user.save();

            })
            .catch((err) => res.json(err));
    const newProduct = new productData({
                    name: req.cookies.name,
                    host: user[0],
                    startday: req.body.startday,
                    endday: req.body.endday,
                    maximuncus: req.cookies.maximumcus,
                    price: req.body.price,
                    type: req.cookies.type,
                    bed: req.cookies.bed,
                    shower: req.cookies.shower,
                    hosthome: true,
                    img: req.cookies.img,
                    display: req.cookies.img[0].path,
                    isRented: false,
                    address: req.cookies.address,
                    validByAdmin: true,
                    Visittime:0,
                    validByAdmin:false
                    
                });
                newProduct.save();
                res.cookie("role","host");
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
        res.clearCookie("address");
        res.clearCookie("img");



        res.redirect("/");
    }

}
module.exports = new RoomController();
