const express = require("express")
const morgan = require("morgan")
const path = require("path")
const router = express.Router();
const engine = require("express-handlebars")
const bodyParser = require("body-parser");
const port = 3000;
const db = require("./db/index");
const app = express();
const mongoose = require("mongoose");
const Route = require("./route/index.route");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const ConfigPaypal = require("../src/config/paypal");
const io = new Server(server);
var cookieParser = require("cookie-parser");
const session = require('express-session');
const dotenv = require('dotenv')
const client=require("../src/config/redis");
client.on('error', err => console.log('Redis Client Error', err));
 client.connect().then(() =>{console.log('Client Connect')}).catch(err => console.log('err'));
  
dotenv.config();
//configure paypal
ConfigPaypal.config();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "995051606326-qofa95ttdiic99l0kckrac33p0bpch6q.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://roomshosting.onrender.com/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        res.cookie("userProfile", userProfile._json);
        res.redirect('/login/auth/google');
    });





app.get('/error', (req, res) => res.send("error logging in"));


const { Socket } = require("socket.io");

app.use(cookieParser());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



app.engine("hbs", engine.engine({ extname: ".hbs", helpers: require('./config/handlebars-helpers') }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

mongoose.set("strictQuery", false);
db.connect();

Route(app);

const room = require("./models/product.model");

io.on('connection', function (socket) {
    console.log("Connection established");
    socket.on('on-chat', (data) => {
        io.emit('user-chat', data);
        let newMes = new messModel({
            host: data.host,
            value: data.message,
            cus: data.cus
        });
        newMes.save();



    })
});
server.listen(port);
