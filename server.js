const express = require("express");
const app = express();
const PORT = 3000;
const auth = require("./routes/auth");




app.use(express.json());
app.use("/", auth);
app.listen(PORT, () => {
    console.log("サーバーを起動中");

})
