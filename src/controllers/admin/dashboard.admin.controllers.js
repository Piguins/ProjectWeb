
const resevation = require("../../models/Reserve.model");
const user = require("../../models/users.model");
const rooms = require("../../models/product.model");
class DashBoard {
    index(req, res, next) {
        let avatar = req.cookies.avatar;



        resevation.find().then((item) => {
            const initialValue = 0;
            const reduceAr = item.map((item) => item.value);

            const sumWithInitial = reduceAr.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), initialValue);
            user.count({}).then((counter) => {


                rooms.count({}).then((count) => {

                    res.render('dashboard', { indexPage: true, hideNavigation: true, avatar: avatar, totalVenue: sumWithInitial, userAmount: counter, roomAmount: count });
                })

            })





        }).catch((err) => {
            console.log(err)
        })


    }
    roomsRequest(req, res, next) {
        let avatar = req.cookies.avatar;



        rooms.find({ validByAdmin: false }).populate("host").then((count) => {

            count = count.map((i) => i.toObject());
            res.render('dashboard', { hideNavigation: true, avatar: avatar, roomsRequest: true, rooms: count });
        })








    }
    contractlist(req, res, next) {
        let avatar = req.cookies.avatar;



        resevation.find().populate("host").populate("cus").populate("room").then((item) => {

            item = item.map((i) => i.toObject());

            res.render('dashboard', { hideNavigation: true, avatar: avatar, contractlist: true, list: item });







        }).catch((err) => {
            console.log(err)
        })

    }

    roomlist(req, res, next) {
        let avatar = req.cookies.avatar;



        rooms.find({}).populate("host").then((count) => {

            count = count.map((i) => i.toObject());
            res.render('dashboard', { hideNavigation: true, avatar: avatar, roomlist: true, rooms: count });
        })






    }

    message(req, res, next) {
        let avatar = req.cookies.avatar;



        resevation.find().then((item) => {
            const initialValue = 0;
            const reduceAr = item.map((item) => item.value);

            const sumWithInitial = reduceAr.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), initialValue);
            user.count({}).then((counter) => {


                rooms.count({}).then((count) => {

                    res.render('dashboard', { hideNavigation: true, avatar: avatar, totalVenue: sumWithInitial, userAmount: counter, roomAmount: count, message: true });
                })

            })





        }).catch((err) => {
            console.log(err)
        })
    }
    roomlistDelete(req, res, next) {

        rooms.deleteOne({ _id: req.params.id }).then(() => {
            res.redirect("/admin/roomlist");
        })
            .catch((err) => { console.log(err) });
    }


    roomsRequestAcept(req, res, next) {

        rooms.findOne({ _id: req.params.id }).then((room) => {
            room.validByAdmin = true;
            room.save();
            res.redirect("/admin/roomsrequest");

        }).catch((err) => { console.log(err) });
    }

}
module.exports = new DashBoard();