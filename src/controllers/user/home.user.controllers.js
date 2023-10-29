const roomCollection = require("../../models/product.model");
const typeCollection = require("../../models/type.model");
const wishlistCollection = require("../../models/collection.model");
const client = require("../../config/redis");
const { json } = require("body-parser");
const { response } = require("express");
class Home {
    async defaultDisplay(req, res, next) {
        const filter = {};
        filter.startday = (req.query.start) ? { $lte: req.query.start } : { $lte: "2024-07-7" };

        filter.endday = (req.query.end) ? { $gte: req.query.end } : { $gte: "2022-07-7" };
        filter.maximuncus = (req.query.quantity) ? { $gte: req.query.quantity } : { $gte: 0 };
        filter.bed = (req.query.bedroom) ? { $gte: req.query.bedroom } : { $gte: 0 };
        filter.shower = (req.query.showerroom) ? { $gte: req.query.showerroom } : { $gte: 0 };
        filter.price = (req.query.minPrice) ? { $gte: req.query.minPrice, $lte: req.query.maxPrice } : { $gte: 0 };
        filter.name = (req.query.search) ? { $regex: "^" + req.query.search, $options: "i" } : { $regex: "^(.*?)" }
        filter.host = { $ne: req.cookies.id }


        if (req.query.type) {
            filter.type = req.query.type;
        }
        filter.validByAdmin = true;
        let datachart = Array(1000).fill(0);
        let isLoggedIn = (req.cookies.token)
            ? true
            : false;


        let isAdmin = (req.cookies.role === "admin" && isLoggedIn)
            ? true
            : false;
        let logged;

        let key = JSON.stringify(filter);

                    let list =await roomCollection.find(filter).populate("host")
                    list = list.map((item) => item.toObject());
                    list = list.map(v => ({ ...v, isLoggedIn: isLoggedIn }))
                    list.forEach((item) => { datachart[item.price]++ })
                    let dataId = datachart.map((val, index) => index);

                    let dataval = datachart.map((val, index) => val);

                    let type = await typeCollection.find({})
                    type = type.map((i) => i.toObject());

                  
                    let wish = await wishlistCollection.find({ user: req.cookies.id })
                    wish = wish.map((i) => i.toObject());
                    let name = req.cookies.username;
                    let email = req.cookies.email;
                    let phone = req.cookies.phone;
                    let avatar = req.cookies.avatar;

                    let address = req.cookies.address;
                  await  client.hSet(key, 'dataId', dataId);
                 await   client.hSet(key, 'dataval', dataval);
                await    client.hSet(key, 'list', list);
                 await   client.hSet(key, 'e', type);
                  await  client.hSet(key, 'wish', wish);

                    res.render("home", {
                        dataId, dataval, address, name, email, phone, avatar, list, islogged: isLoggedIn, e:type, wish, role: req.cookies.role,
                        isAdmin: isAdmin,
                        id: req.cookies.id


                    })

        // client.hGetAll(key, async (err, result) => {
        //     if (err) {
        //         console.error('Failed to get value from Redis:', err);
        //     } else {
        //         if (result === null||result.length === 0) {

        //             let list =await roomCollection.find(filter).populate("host")
        //             list = list.map((item) => item.toObject());
        //             list = list.map(v => ({ ...v, isLoggedIn: isLoggedIn }))
        //             list.forEach((item) => { datachart[item.price]++ })
        //             let dataId = datachart.map((val, index) => index);

        //             let dataval = datachart.map((val, index) => val);

        //             let type = await typeCollection.find({})
        //             type = type.map((i) => i.toObject());

        //             type = type.map((i) => i.toObject());
        //             let wish = await wishlistCollection.find({ user: req.cookies.id })
        //             wish = wish.map((i) => i.toObject());
        //             let name = req.cookies.username;
        //             let email = req.cookies.email;
        //             let phone = req.cookies.phone;
        //             let avatar = req.cookies.avatar;

        //             let address = req.cookies.address;
        //           await  client.hSet(key, 'dataId', dataId);
        //          await   client.hSet(key, 'dataval', dataval);
        //         await    client.hSet(key, 'list', list);
        //          await   client.hSet(key, 'e', type);
        //           await  client.hSet(key, 'wish', wish);

        //             res.render("home", {
        //                 dataId, dataval, address, name, email, phone, avatar, list, islogged: isLoggedIn, e:type, wish, role: req.cookies.role,
        //                 isAdmin: isAdmin,
        //                 id: req.cookies.id


        //             })







        //         } else {
        //             res.json(result);
        //         }

        //     }
        // });







    }
}
module.exports = new Home();
