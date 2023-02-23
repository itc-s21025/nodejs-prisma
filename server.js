const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')
const auth = require("./routes/auth");
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use("/", auth);

app.set('trust proxy', 1)
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "qawsedrf",
    store: new (require('connect-pg-simple')(session))({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true
    })

}));

app.listen(PORT, () => {
    console.log("サーバーを起動中");

})
