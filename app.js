const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
require('dotenv').config();


app.use(bodyParser.json());
app.use(session({
    secret: 3948109348213048,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
    next();
});

app.use(cors({
    origin: "*",  // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Z-Key", "Authorization"]
}));
app.use("/", require("./routes/index"))

passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));


passport.serializeUser((user, done) =>{
    done(null,user);
});

passport.deserializeUser((user,done) =>{
    done(null, user);
});

app.get("/", (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");});
app.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/api-docs", session: false}),
    (req,res) =>{
        req.session.user = req.user;
        res.redirect("/");
});

module.exports = app;
