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
    const student_code = {data: req.body};
    const student = await prisma.student.findFirst({
        where: {
            code: student_code
        }
    })
    if (student == null) {
        res.json({status: 0})
    }else {
        req.session.student = student
        res.json({status: 1})
    }
})
/**const data = {data: req.body};
 const studentid = await prisma.student.findFirst({
        where: {
            code: data
        }
    })
 if (studentid == null) {
        res.json({status: 0})
    }else {
        req.session.studentid = studentid
        res.json({status: 1})
    }
 });
 **/

router.post('/logout', async (req, res) => {
    res.session.studentId
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
