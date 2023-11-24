const userData = require("../models/users.model");
const productData = require("../models/product.model");
const Collection = require("../models/collection.model");


const Reserve = require("../models/Reserve.model");
class user {
    setavatar(req, res, next) {

        res.render("setavatar", { addProcessing: true });
    }

    saveAvatar(req, res, next) {

        userData.findByIdAndUpdate({ _id: req.cookies.id }, { avatar: req.file.originalname }).then((love) => {
            res.redirect("/")
        }).catch(err => res.json("failed"))
    }
    getTrip(req, res, next) {
        let logged;

        if (req.cookies.token) {
            logged = true;
        }
        else {
            logged = false;
        }
        let name = req.cookies.username;
        let email = req.cookies.email;
        let phone = req.cookies.phone;
        let avatar = req.cookies.avatar;
        Reserve.find({ cus: req.cookies.id }).populate("room")
            .then((list) => {
                list = list.map((item) => item.toObject());

                res.render("trips", { name, email, phone, avatar, list, islogged: logged, addProcessing: true });
            })
            .catch((err) => console.log(err));

    }
    addCollection(req, res, next) {
        const love = new Collection({
            name: req.body.name,
            user: req.cookies.id,
            room: []
        });
        love.save();

        res.redirect("/");

    }
    updateWishlist(req, res, next) {

        // Collection.findOneAndUpdate({ _id: req.params.id }, {
        //     $push: { room: req.body.roomId },
        // })
        productData.find({ _id: req.body.roomId }).then((love) => {
            love = love.map((i) => i.toObject()); Collection.findByIdAndUpdate(
                req.params.id,
                { $push: { room: req.body.roomId, display: love[0].display } },
                function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Updated User : ", docs);
                    }
                }
            );

            res.redirect("/");
        }).catch(err => console.log(err))

    }
    getWishlist(req, res, next) {
        let logged;

        if (req.cookies.token) {
            logged = true;
        }
        else {
            logged = false;
        }
        let name = req.cookies.username;
        let email = req.cookies.email;
        let phone = req.cookies.phone;
        let avatar = req.cookies.avatar;
        Collection.find({ user: req.cookies.id }).then(wish => {
            wish = wish.map((i) => i.toObject());

            res.render("wishlist", { name, email, phone, avatar, wish, Title: "Danh sách yêu thích", islogged: logged });
        }).catch(err => console.log(err))
    }
}
module.exports = new user();