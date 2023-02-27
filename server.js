const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')
const auth = require("./routes/auth");
const absence = require("./routes/absences")
const certificate = require("./routes/certificate")
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

app.set('trust proxy', 1)
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
    store: new pgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true,
    }),

}));

app.use("/", auth);
app.use("/", absence);
app.use("/", certificate);

app.listen(PORT, () => {
    console.log("サーバーを起動中");

})
