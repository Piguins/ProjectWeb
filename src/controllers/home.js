const hotel = require("../models/product.model");
const type = require("../models/type.model");
const collection = require("../models/collection.model");
class Home {
    type(req, res, next) {

        let logged;
        if (req.cookies.token) {
            logged = true;
        }
        else {
            logged = false;
        }
        hotel.find({ type: req.params.type }).then((list) => {
            list = list.map((item) => item.toObject());

            type.find({}).then((e) => {
                e = e.map((i) => i.toObject());
                res.render("home", { list, islogged: logged, e });

            }).catch(err => { console.log(err) });

        });



    }
    index(req, res, next) {

        let start = req.query.start || "";
        let end = req.query.end || "";
        let quantity = req.query.quantity || 1;
        let search = req.query.search || "";
        let logged;

        if (req.cookies.token) {
            logged = true;
        }
        else {
            logged = false;
        }
        // if (start === "" && end === "" && quantity === "" && search === "") {
        //     hotel.find({}).then((list) => {
        //         list = list.map((item) => item.toObject());

        //         type.find({}).then((e) => {
        //             e = e.map((i) => i.toObject());
        //             res.render("home", { list, islogged: logged, e });

        //         }).catch(err => { console.log(err) });

        //     });
        // }


        const day1 = (start !== "") ? new Date(start) : Date.now();
        const day2 = (end !== "") ? new Date(end) : Date.now();
        if (search !== "") {

            hotel
                .find({
                    name: { $regex: "^" + search, $options: "i" }, startday: {
                        $lte: day1,
                    },
                    endday: {
                        $gte: day2,
                    },
                    maximuncus: {
                        $gte: quantity
                    }
                })
                .then((list) => {
                    list = list.map((item) => item.toObject());

                    type.find({}).then((e) => {
                        e = e.map((i) => i.toObject());
                        collection.find({ user: req.cookies.id }).then(wish => {
                            wish = wish.map((i) => i.toObject());
                            let name = req.cookies.username;
                            let email = req.cookies.email;
                            let phone = req.cookies.phone;
                            let avatar = req.cookies.avatar;
                            res.render("home", { name, email, phone, avatar, list, islogged: logged, e, wish });
                        }).catch(err => console.log(err));

                    }).catch(err => console.log(err));
                })
        }
        else {
            hotel
                .find({

                    endday: {
                        $gte: day2,
                    },
                    maximuncus: {
                        $gte: quantity
                    }
                })
                .then((list) => {
                    list = list.map((item) => item.toObject());

                    type.find({}).then((e) => {
                        e = e.map((i) => i.toObject());
                        collection.find({ user: req.cookies.id }).then(wish => {
                            wish = wish.map((i) => i.toObject());
                            let name = req.cookies.username;
                            let email = req.cookies.email;
                            let phone = req.cookies.phone;
                            let avatar = req.cookies.avatar;
                            res.render("home", { name, email, phone, avatar, list, islogged: logged, e, wish });
                        }).catch(err => console.log(err));

                    }).catch(err => console.log(err));
                })
        }

        // if (Object.keys(req.query).length === 0) {
        //     hotel.find({}).then((list) => {
        //         list = list.map((item) => item.toObject());

        //         res.render("home", { list });
        //     });
        // }
        // else {
        //     hotel
        //         .find({
        //             maximuncus: { $gte: quantity },
        // startday: {
        //     $lte: day1,
        // },
        // endday: {
        //     $gte: day2,
        // },
        //         })
        //         .then((list) => {
        //             list = list.map((item) => item.toObject());

        //             res.render("home", { list, admin: true, admin: isAdmin });
        //         });
        // }

    }
}
module.exports = new Home();
