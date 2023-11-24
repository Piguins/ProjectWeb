const HomeRouter = require("./home");
const ProductRouter = require("./product");
const addProduct = require("./addProduct");
const Resister = require("./register");
const LoginRouter = require("./login");
const LogoutRouter = require("./logout");


const addType = require("./addtype");
const userRoute = require("./user");
function Route(App) {


  App.use("/register", Resister);
  App.use("/login", LoginRouter);
  App.use("/product", ProductRouter);
  App.use("/add", addProduct);
  App.use("/logout", LogoutRouter);
  App.use("/addtype", addType);
  App.use("/user", userRoute);
  App.use("/", HomeRouter);
}
module.exports = Route;
