const router = require("express").Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.post("/register",async (req, res) => {
    const data = {data: req.body};
    await prisma.student.create(data)
        .then(() => {
        res.json({status: 0})
    }).catch(() => {
        res.json({status: 1})
    })
})

// ログイン
router.post('/login', async (req, res) => {

    const {code} = req.body
    const studentid = await prisma.student.findFirst({
        where: {
            code: code
        }
    })
    if (studentid == null) {
        res.json({status: 0})
    }else {
        res.json({status: 1})
        res.session.status
    }
});

router.post('/logout', async  (req, res) => {
    res.session.studentId
    res.json({status: 0})
});

module.exports = router
