const router = require("express").Router();
const {PrismaClient} = require('@prisma/client');


router.post("/",async (req, res) => {

    const prisma = new PrismaClient();
    const data = {data: req.body};
    const student = await prisma.student.create(data);
    res.json(student);

});


module.exports = router
