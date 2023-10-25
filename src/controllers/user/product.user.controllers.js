const Product = require("../../models/product.model");
const paypal = require('paypal-rest-sdk');
const Reserve = require("../../models/Reserve.model");
const Rating = require("../../models/rating.model");
const Converesation = require("../../models/conversation.model");
const Comment = require("../../models/rating.model");
const { response } = require("express");
class ProductController {


  addComment(req, res, next) {

    Comment.findOne({ owner: req.cookies.id, room: req.body.room }).then((item) => {
      if (item) {
        item.value = req.body.value,
          item.star = req.body.rating

        item.save();
      } else {
        let newComment = new Comment({
          owner: req.cookies.id,
          value: req.body.value,
          star: req.body.rating,
          room: req.body.room,
          host:req.body.host


        })
        newComment.save();
      }


      res.redirect("/user/trip");
    }).catch(err => { console.log(err); })


  }
  async specific(req, res, next) {
   
    let logged;
    let conversationId;
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
   let item=await Reserve.find({value:"9.2"});
            

    Product.findOne({ _id: id }).populate('host')
      .then((data) => {
        data.Visittime = data.Visittime + 1;
        data.save();
        data = data ? data.toObject() : data;
        let img = data.img;
        Rating.find({ room:id,owner:req.cookies.id }).populate("owner").then(wish => {
          
          wish = wish.map((i) => i.toObject());
          let name = req.cookies.username;
          let email = req.cookies.email;
          let phone = req.cookies.phone;
          let avatar = req.cookies.avatar;
          let address = req.cookies.address;
          let id = req.cookies.id;
          let isOwner = (req.cookies.id === data.host._id)

            ? true : false;
          let conversationId = req.cookies.conversationId; 

          res.render("specific", { item,role: req.cookies.role, address, isOwner, conversationId: conversationId, id, name, email, phone, avatar, img, islogged: logged, data, admin: isAdmin, Title: data.name, wish });

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
        "return_url": "http://localhost:3000/rooms/payment/success",
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
        res.render('success', { hideNavigation: true });
      }
    });
  }




  displayProductAddingForm(req, res, next) {
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

        res.render("addProduct", { items, addProcessing: true });
      })
      .catch((err) => res.json(err));


  }

  displayProductAddingForm1(req, res, next) {

    res.render("addProduct1", { addProcessing: true });
  }

  displayProductAddingForm2(req, res, next) {
    res.render("addProduct2", { addProcessing: true });
  }
  saveDataFromForm(req, res, next) {
    res.cookie("name", req.body.name);
    res.cookie("type", req.body.type);
    res.redirect("step1");
  }
  saveDataFromForm1(req, res, next) {

    res.cookie("startday", req.body.startday);
    res.cookie("endday", req.body.endday);
    res.cookie("maximumcus", req.body.maximumcus);
    res.cookie("price", req.body.price);
    res.cookie("hosthome", req.body.hosthome);
    res.cookie("bed", req.body.bed);
    res.cookie("shower", req.body.shower);

    res.redirect("step2");
  }
  saveNewProduct(req, res, next) {

    const love = req.files.map(e => e.originalname);



    user.find({ _id: req.cookies.id })
      .then((user) => {

        const newProduct = new productData({
          name: req.cookies.name,
          host: user[0],
          startday: req.cookies.startday,
          endday: req.cookies.endday,
          maximuncus: req.cookies.maximumcus,
          price: req.cookies.price,
          type: req.cookies.type,
          bed: req.cookies.bed,
          shower: req.cookies.shower,
          hosthome: req.cookies.hosthome,
          img: love,
          display: love[0],
          validByAdmin: false
        });
        newProduct.save();


      })
      .catch((err) => res.json(err));

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

    res.redirect("/");
  }
}
module.exports = new ProductController();
