const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const kinds = {
    1:"欠席",
    2:"就活欠席",
    3:"遅刻",
    4:"早退"
}

router.get('/absence', async (req, res) => {
    const student = req.session.student
    const data = await prisma.absences.findMany({
        where: {
            studentId: student.id
        },
        include: {
            student_id: true
        }
    })

    const absence = data.map((absences) => {
        return {
            id: absences.id,
            kind: kinds[absences.kind],
            reason: absences.reason,
            start_date: absences.start_date,
            end_date: absences.end_date,
            create_at: absences.create_at,
            student_code: absences.student_id.code,
            student_name: absences.student_id.name

        }

    })
    res.json(absence)
})

router.post('/absence/add', async (req, res) => {
    const student = req.session.student
    const {kind, reason, start_date, end_date} = req.body
    await prisma.absences.create({
        data: {
            studentId: student.id,
            kind: kind,
            reason: reason,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
        }
    }).then(() => {
            res.json({status: 0})
        }).catch(() => {
            res.json({status: 1})
        })

})

module.exports = router

