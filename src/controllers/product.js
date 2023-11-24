const Product = require("../models/product.model");
const paypal = require('paypal-rest-sdk');
const Reserve = require("../models/Reserve.model");
const collection = require("../models/collection.model");
class ProductController {

  specific(req, res, next) {
    let logged;
    if (req.cookies.token) {
      logged = true;
    }
    else {
      logged = false;
    }
    const id = req.params.id;
    let isAdmin = false;
    if (req.cookies.role) {
      isAdmin = req.cookies.role === "admin" ? true : false;
    }
    else { isAdmin = false; }

    Product.findOne({ _id: id }).populate('host')
      .then((data) => {

        data = data ? data.toObject() : data;
        let img = data.img;
        collection.find({ user: req.cookies.id }).then(wish => {
          wish = wish.map((i) => i.toObject());
          let name = req.cookies.username;
          let email = req.cookies.email;
          let phone = req.cookies.phone;
          let avatar = req.cookies.avatar;
          res.render("specific", { name, email, phone, avatar, img, islogged: logged, data, admin: isAdmin, Title: data.name, wish });

        }).catch(err => console.log(err));


      })
      .catch((err) => console.log(err));
  }
  payment(req, res, next) {


    const value = req.body.final;
    res.cookie("value", value);
    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:3000/product/payment/success",
        "cancel_url": "http://localhost:3000"
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": "item",
            "sku": "item",
            "price": value,
            "currency": "USD",
            "quantity": 1
          }]
        },
        "amount": {
          "currency": "USD",
          "total": value
        },
        "description": "This is the payment description."
      }]
    };


    const newReserve = new Reserve({
      host: req.body.hostId,
      room: req.body.roomId,
      start: req.body.startday,
      end: req.body.endday,
      day: req.body.days,
      value: req.body.final,
      cus: req.cookies.id

    });
    newReserve.save();
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });

  }

  success(req, res, next) {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": req.cookies.value
        }
      }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.render('success', { addProcessing: true });
      }
    });
  }

}
module.exports = new ProductController();
