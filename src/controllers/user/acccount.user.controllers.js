const userData = require("../../models/users.model");
const Room = require("../../models/product.model");
const productData = require("../../models/product.model");
const Collection = require("../../models/collection.model");
const Converesation = require("../../models/conversation.model");
const Rating = require("../../models/rating.model");
const sendmail = require("../../config/nodemail");
const Reserve = require("../../models/Reserve.model");
var generator = require('generate-password');
const bcrypt = require("bcrypt");
const { response } = require("express");
const User = require("../../models/users.model");
class user {

    //[Get] /user/avatar
    setavatar(req, res, next) {
        res.render("setavatar", { hideNavigation: true });
    }
    //[Post] /user/avatar
    saveAvatar(req, res, next) {
        userData.findByIdAndUpdate({ _id: req.cookies.id }, { avatar: req.file.path }).then((love) => {
            res.cookie("avatar", req.file.path);
            res.redirect("/")
        }).catch(err => res.json("failed"))
    }
    //[Get] /user/hosting
    async getHosting(req, res, next) {
        let gonnaCome, isMeeting, hasGone;
        let rooms = await productData.find({ host: req.cookies.id });
        let item = await Reserve.find({ host: req.cookies.id }).populate(["room", "cus"])
        item = item.map(i => i.toObject());
        gonnaCome = item.filter((item) => {
            return item.start.getTime() > Date.now()
        })
        isMeeting = item.filter((item) => {
            return (item.start.getTime() < Date.now() && item.end.getTime() > Date.now())
        })
        hasGone = item.filter((item) => {
            return item.end.getTime() < Date.now()
        }) 
        
         res.render("hosting", { rooms,hideNavigation: true, gonnaCome, isMeeting, hasGone, userId: req.cookies.id });
    }
    //[Get] /user/trip
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
        Reserve.find({ cus: req.cookies.id }).populate(["room", "host"])
            .then((list) => {
                list = list.map((item) => item.toObject());

                res.render("trips", { name, email, phone, avatar, list, islogged: logged, addProcessing: true, hideNavigation: true });
            })
            .catch((err) => console.log(err));

    }
    getHostingCalendar(req, res, next) {
        res.render("calendar", { hideNavigation: true });
    }
    //[Post] /user/wishlist/collection
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
            redirect('/login')
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

    displayUserPorpolio(req, res, next) {
        userData.findById(req.cookies.id).then((user) => {

            res.render('porpolio', { user });
        })
    }
    message(req, res, next) {

        res.render('message', {});
    }
    getMessage(req, res, next) {
        Converesation.findOne({ _id: req.params.id }).then(conver => {
            conver = conver.map((i) => i.toObject());
            res.render('message', { converesation: conver });
        }).catch(err => { })

    }
    postMessage(req, res, next) {


        Converesation.find({
            cusId: req.query.cus,
            hostId: req.query.host
        }).then(item => {
            if (item.length === 0) {
                const newConveresation = new Converesation({
                    cusId: req.body.cus,
                    hostId: req.body.host
                });
                newConveresation.save();


            }
            else {




            }
        }

        ).catch(err => { console.error(err) })
    }


    async send(req, res, next) {

        try {

            const url = `${process.env.BASE_URL}/user/activateAccount/${req.params.id}`;
            await sendmail(req.cookies.email, "Verify Email", url);

            next();
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }
    validEmail(req, res, next) {

        res.render("verify", { hideNavigation: true, id: req.params.id });
    }
    validateEmail(req, res, next) {

        res.clearCookie("token");
        res.clearCookie("id");

        res.clearCookie("avatar");
        res.clearCookie("role");
        res.clearCookie("username");
        res.clearCookie("phone");
        res.clearCookie("password");
        res.render("emailnotify", { hideNavigation: true });




    }
    activateAccount(req, res, next) {
        userData.findById(req.params.id).then(item => {
            item.autherized = true;
            item.save();
            res.redirect("/login");
        }).catch(err => { console.log(err); });
    }

    getPassword(req, res, next) {
        res.render("forgetpassword", { hideNavigation: true });
    }
    async sendPassword(req, res, next) {

        const user = await userData.find({ email: req.body.email });
        if (Object.entries(user).length === 0) {
            res.render("forgetpassword", {
                message: "địa chỉ email không có trong hệ thống",
                announce: true,
                hideNavigation: true,
            });
        } else {

            var password = generator.generate({
                length: 10,
                numbers: true
            });


            bcrypt.hash(password, 10).then((hash) => {
                userData.findOneAndUpdate({ email: req.body.email }, { password: hash }).then((item) => {
                    const url = "Your new password is " + password;
                    sendmail(req.body.email, "Verify Email", url).then((item) => {
                        res.render("forgetpassword", {
                            message: "mật khẩu mới được gửi tơi " + req.body.email,
                            announce: true,
                            hideNavigation: true,
                        });


                    }).catch((err) => { console.log(err); })
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));



        }

    }
    //[Get]/user/personaldetail/:id
    async getPersonaldetail(req, res, next) {
        let personalroom = await Room.find({ host: req.params.id }, { _id: 1, img: 1 }).limit(4);
        personalroom = personalroom.map(i => i.toObject());
        let rating = await Rating.find({ host: req.params.id }).populate("owner");
        rating = rating.map(i => i.toObject());

        let personaldetail = await userData.findOne({ _id: req.params.id }, { description: 1, language: 1, habit: 1, role: 1, avatar: 1, fullName: 1, email: 1, phoneNumber: 1, numberOfjudgement: 1, introduce: 1 });
        res.render("PersonalDetail", {
            ratings: rating,

            role: personaldetail.role,
            avatar: personaldetail.avatar,
            name: personaldetail.fullName,
            email: personaldetail.email,
            phone: personaldetail.phoneNumber,
            evaluate: personaldetail.numberOfjudgement,
            introduce: personaldetail.introduce,
            rooms: personalroom,
            PersonId: req.params.id,
            UserId: req.cookies.id,
            description: personaldetail.description,
            language: personaldetail.language,
            habit: personaldetail.habit,

        })


    }

    getPersonaldetailUpdate(req, res, next) {

        const filter = { _id: req.params.id };
        const update = {
            $set:
            {
                description: req.body.description,
                language: req.body.language,
                habit: req.body.habit
            }
        };
        userData.findOneAndUpdate(filter, update).then(() => {
            res.redirect("/user/personaldetail/" + req.params.id)
        }).catch(err => { });
    }


    async updatePersonalName(req, res, next) {

        let name = req.body.firstname + req.body.lastname;

        await userData.findOne({ _id: req.cookies.id }).then((user) => {
            user.fullName = name;
            user.save();
        }).catch(err => console.log(err));
        res.cookie("username", name);
        res.redirect("/");
    }
    async updatePersonalPhone(req, res, next) {

        await userData.findOne({ _id: req.cookies.id }).then((user) => {
            user.phoneNumber = req.body.phone;

        }).catch(err => console.log(err));
        res.cookie("phone", req.body.phone);
        user.save(); res.redirect("/");
    }
    async updatePersonalAddress(req, res, next) {

        await userData.findOne({ _id: req.cookies.id }).then((user) => {
            user.address = req.body.address;
            user.save();
        }).catch(err => console.log(err));
        res.cookie("address", req.body.address);
        res.redirect("/");
    }

}
module.exports = new user();