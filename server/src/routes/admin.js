const { adminLogin, sendReport, viewReport, reportDelete, adminReport } = require("../controllers/admin")
module.exports = async function (fastify, opts, done) {

    fastify.post('/adminlogin',adminLogin)

    fastify.post('/sendreport',sendReport)

    fastify.get('/viewreport',viewReport)

    fastify.delete('/deletereport/:id',reportDelete)
    
    fastify.put('/adminreport/:id',adminReport)

    done();
}