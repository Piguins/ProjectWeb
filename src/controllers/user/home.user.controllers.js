const roomCollection = require("../../models/product.model");
const typeCollection = require("../../models/type.model");
const { promisify } = require('util');
const wishlistCollection = require("../../models/collection.model");
const client = require("../../config/redis");
const hsetAsync = promisify(client.hSet).bind(client);

class Home {
    async defaultDisplay(req, res, next) {
        const filter = {};
        const sort = {};
        filter.startday = (req.query.start) ? { $lte: req.query.start } : { $lte: "2024-07-7" };
        filter.endday = (req.query.end) ? { $gte: req.query.end } : { $gte: "2022-07-7" };
        filter.maximuncus = (req.query.quantity) ? { $gte: req.query.quantity } : { $gte: 0 };
        filter.bed = (req.query.bedroom) ? { $gte: req.query.bedroom } : { $gte: 0 };
        filter.shower = (req.query.showerroom) ? { $gte: req.query.showerroom } : { $gte: 0 };
        filter.price = (req.query.minPrice) ? { $gte: req.query.minPrice, $lte: req.query.maxPrice } : { $gte: 0 };
        filter.name = (req.query.search) ? { $regex: "^" + req.query.search, $options: "i" } : { $regex: "^(.*?)" }
        filter.host = { $ne: req.cookies.id }
     
  
       if(req.query.incre||req.query.dec){
        sort.price= (req.query.incre)?'-1':'1';
       }
       
       if(req.query.newest){
        sort.created_at= '1'
       }
            sort.name=1;
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
        let key = JSON.stringify(filter)+JSON.stringify(sort);
        client.hGetAll(key, async (error, value) => {
            if (error || value === null) {
                let list = await roomCollection.find(filter).sort(sort).populate("host", 'avatar')
                list = list.map((item) => item.toObject());
                list = list.map(v => ({ ...v, isLoggedIn: isLoggedIn }))


                const rooms = Object.fromEntries(
                    Object.entries(list).sort((a,b) => Math.random() - 0.5)
                );
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
                await client.hSet(key, 'dataId', JSON.stringify(dataId));
                await client.hSet(key, 'dataval', JSON.stringify(dataval));
                await client.hSet(key, 'list', JSON.stringify(rooms));
                await client.hSet(key, 'e', JSON.stringify(type));
                await client.hSet(key, 'wish', JSON.stringify(wish));
                client.expire(key, 600);
                res.render("home", {
                    dataId, dataval, address, name, email, phone, avatar, list:rooms, islogged: isLoggedIn, e: type, wish, role: req.cookies.role,
                    isAdmin: isAdmin,
                    id: req.cookies.id
                })
            } else {

                const list = JSON.parse(value.list);

                const e = JSON.parse(value.e);
                const wish = JSON.parse(value.wish);
                const dataval = JSON.parse(value.dataval);
                const dataId = JSON.parse(value.dataId);

                let name = req.cookies.username;
                let email = req.cookies.email;
                let phone = req.cookies.phone;
                let avatar = req.cookies.avatar;

                let address = req.cookies.address;
                res.render("home", {
                    dataId, dataval, address, name, email, phone, avatar, list, islogged: isLoggedIn, e: e, wish, role: req.cookies.role,
                    isAdmin: isAdmin,
                    id: req.cookies.id


                })


            }
        });






    }
}

module.exports = new Home();
