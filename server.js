const express = require("express");
const app = express();
const PORT = 3000;
const auth = require("./routes/auth");
const session = require('express-session')
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(express.json());
app.use("/", auth);
app.listen(PORT, () => {
    console.log("サーバーを起動中");

})
