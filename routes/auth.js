const router = require("express").Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


router.post("/register", async (req, res) => {
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
    const {data} = req.body
    const studentid = await prisma.student.findFirst({
        where: {
            code: data
        }
    })
    if (studentid == null) {
        res.json({status: 0})
    }else {
        console.log(req.session)
        req.session.student = studentid
        res.json({status: 1})

    }
    })

router.get('/info', (req, res) => {
    const student = req.session.student
    if (student === undefined) {
        res.send("loginしていません")
    }else {
        res.json(student)
    }
})

router.get('/logout', async (req, res) => {
    req.session.student = undefined
    res.json({status: 0})
});

router.get('/test', async (req, res) => {
    const data = "s21022"
    const student = await prisma.student.findFirst({
        where: {
            code: data
        }
    })
    console.log(student)
})

module.exports = router
