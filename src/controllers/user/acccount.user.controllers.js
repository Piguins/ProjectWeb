const userData = require("../../models/users.model");
const productData = require("../../models/product.model");
const Collection = require("../../models/collection.model");
const Converesation = require("../../models/conversation.model");
const sendmail = require("../../config/nodemail");
const Reserve = require("../../models/Reserve.model");
var generator = require('generate-password');
const bcrypt = require("bcrypt");
const { response } = require("express");
class user {
    setavatar(req, res, next) {

        res.render("setavatar", { addProcessing: true });
    }

    saveAvatar(req, res, next) {

        userData.findByIdAndUpdate({ _id: req.cookies.id }, { avatar: req.file.originalname }).then((love) => {
            res.redirect("/")
        }).catch(err => res.json("failed"))
    }
    getHosting(req, res, next) {
    res.render("hosting",{hideNavigation:true});
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

                res.render("trips", { name, email, phone, avatar, list, islogged: logged, addProcessing: true, hideNavigation: true });
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


    async send(req, res) {
        try {

            const url = `${process.env.BASE_URL}/user/validemail/${req.params.id}`;
            await sendmail("20520923@gm.uit.edu.vn", "Verify Email", url);

            res
                .status(201)
                .send({ message: "An Email sent to your account please verify" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }
    validEmail(req, res, next) {

        res.render("verify", { hideNavigation: true, id: req.params.id });
    }
    validateEmail(req, res, next) {

        userData.findByIdAndUpdate({ _id: req.params.id }, { autherized: true }).then((user) => {
            res.redirect("/");
        }).catch(err => {

        })




    }
   
    getPassword(req, res, next) {
        res.render("forgetpassword", { hideNavigation: true });
    }
    async sendPassword(req, res, next) {

        const user = await userData.find({ email: req.body.email });
        if (Object.entries(user).length === 0) {
            res.render("forgetpassword", {
                message: "gmail khong co trong he thong",
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
                        res.render("forgetpassword",{ message: "mat khau da duoc gui toi emaildjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
                        announce: true,
                        hideNavigation: true, });


                    }).catch((err) => { console.log(err); })
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
              


            }

    }

    }
module.exports = new user();