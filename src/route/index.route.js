const HomeRouter = require("./user/home.user.route");
const ProductRouter = require("./user/product.user.route");
const addProduct = require("./host/product.host.route");
const Resister = require("./user/register.user.route");
const LoginRouter = require("./user/login.user.route");
const LogoutRouter = require("./user/logout.user.route");


const addType = require("./admin/addtype");
const userRoute = require("./user/account.user.route");
const adminRoute = require("./admin/index.admin.route");
const contactRoute=require("./host/contact.host.route");
function Route(App) {


  App.use("/register", Resister);
  App.use("/login", LoginRouter);
  App.use("/rooms", ProductRouter);
  App.use("/host", addProduct);
  App.use("/logout", LogoutRouter);
  App.use("/addtype", addType);
  App.use("/user", userRoute);
  App.use("/", HomeRouter);
  App.use("/admin", adminRoute)
  App.use("/contac",contactRoute);

}
module.exports = Route;
