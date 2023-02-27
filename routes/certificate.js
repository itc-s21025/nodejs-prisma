const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/certificate', async (req, res) => {
    const student = req.session.student
    const data = await prisma.cerfiticate_Applications.findMany({
        where: {
            studentId: student.id
        }
    })
    const applications = data.map((apply) => {
        const total_copy =
            apply.certificate_of_enrollment+
            apply.transcript+
            apply.attendance_certificate+
            apply.certificate_of_expected_graduation+
            apply.graduation_certificate+
            apply.health_certificate
        const total_amount =
            apply.certificate_of_enrollment * 200 +
            apply.transcript * 200 +
            apply.attendance_certificate * 200 +
            apply.certificate_of_expected_graduation * 200 +
            apply.graduation_certificate * 200 +
            apply.health_certificate * 100
        return {
            id: apply.id,
            certificate_of_enrollment: apply.certificate_of_enrollment,
            transcript: apply.transcript,
            attendance_certificate: apply.attendance_certificate,
            certificate_of_expected_graduation: apply.certificate_of_expected_graduation,
            graduation_certificate: apply.graduation_certificate,
            health_certificate: apply.health_certificate,
            created_at: apply.created_at,
            scheduled_date: apply.scheduled_date,
            total_copy: total_copy,
            total_amount: total_amount
        }
    })
    res.json(applications)
})
router.post("/certificate/apply", async (req, res) => {
    const {
        certificate_of_enrollment,
        transcript,
        attendance_certificate,
        certificate_of_expected_graduation,
        graduation_certificate,
        health_certificate
    } = req.body
    const student = req.session.student
    await prisma.cerfiticate_Applications.create({
        data: {
            studentId: student.id,
            certificate_of_enrollment: certificate_of_enrollment,
            transcript: transcript,
            attendance_certificate: attendance_certificate,
            certificate_of_expected_graduation: certificate_of_expected_graduation,
            graduation_certificate: graduation_certificate,
            health_certificate: health_certificate
        }
    }).then((result) => {
        const total_copy =
            result.certificate_of_enrollment+
            result.transcript+
            result.attendance_certificate+
            result.certificate_of_expected_graduation+
            result.graduation_certificate+
            result.health_certificate
        const total_amount =
            result.certificate_of_enrollment * 200 +
            result.transcript * 200 +
            result.attendance_certificate * 200 +
            result.certificate_of_expected_graduation * 200 +
            result.graduation_certificate * 200 +
            result.health_certificate * 100
        res.json({
            status: 0,
            receipt: req.body,
            scheduled_date: result.schedule_date,
            total_copy: total_copy,
            total_amount: total_amount
        })
    }).catch(() => {
        res.json({status: 1})
    })
})

router.get('/certificate/test', (req, res) => {
    const hello = "Hello";
    res.json(hello)
})

module.exports = router
