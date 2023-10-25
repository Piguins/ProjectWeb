const roomCollection = require("../../models/product.model");
const typeCollection = require("../../models/type.model");
const wishlistCollection = require("../../models/collection.model");
const { json } = require("body-parser");
class Home {
    defaultDisplay(req, res, next) {
        const filter = {};
        filter.startday = (req.query.start) ? { $lte: req.query.start } : { $lte: "2024-07-7" };

        filter.endday = (req.query.end) ? { $gte: req.query.end } : { $gte: "2022-07-7" };
        filter.maximuncus = (req.query.quantity) ? { $gte: req.query.quantity } : { $gte: 0 };
        filter.bed = (req.query.bedroom) ? { $gte: req.query.bedroom } : { $gte: 0 };
        filter.shower = (req.query.showerroom) ? { $gte: req.query.showerroom } : { $gte: 0 };
        filter.price = (req.query.minPrice) ? { $gte: req.query.minPrice, $lte: req.query.maxPrice } : { $gte: 0 };
        filter.name = (req.query.search) ? { $regex: "^" + req.query.search, $options: "i" } : { $regex: "^(.*?)" }
        filter.host={ $ne: req.cookies.id }
        if (req.query.type) {
            filter.type = req.query.type;
        }
        filter.validByAdmin = true;
        let data = Array(1000).fill(0);
        let isLoggedIn = (req.cookies.token)
            ? true
            : false;


        let isAdmin = (req.cookies.role === "admin" && isLoggedIn)
            ? true
            : false;
        let logged;



        roomCollection
            .find(filter).populate("host")
            .then((list) => {

                list = list.map((item) => item.toObject()); list = list.map(v => ({ ...v, isLoggedIn: isLoggedIn }))
                list.forEach((item) => { data[item.price]++ })
                let dataId = data.map((val, index) => index);

                let dataval = data.map((val, index) => val);
                typeCollection.find({}).then((e) => {
                    e = e.map((i) => i.toObject());
                    wishlistCollection.find({ user: req.cookies.id }).then(wish => {
                        wish = wish.map((i) => i.toObject());
                        let name = req.cookies.username;
                        let email = req.cookies.email;
                        let phone = req.cookies.phone;
                        let avatar = req.cookies.avatar;
                        let address = req.cookies.address

                        res.render("home", { dataId, dataval,address, name, email, phone, avatar, list, islogged: isLoggedIn, e, wish, role:req.cookies.role,
                            isAdmin: isAdmin,
                            id:req.cookies.id 
                        
                        });
                    }).catch(err => console.log(err));

                }).catch(err => console.log(err));
            })




    }
}
module.exports = new Home();
