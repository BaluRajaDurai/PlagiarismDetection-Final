// declaring the routes for student
const { studentSignup, studentVerify, studentLogin, studentDetail,studentProfile,studentprofileEdit,studentTopic,topicSubmisson,submitVerify,submittedDetail} = require("../controllers/student")
module.exports = async function (fastify, opts, done) {

    fastify.post('/studentsignup',studentSignup)

    fastify.get('/studentverify/:uniqueString',studentVerify)

    fastify.post('/studentlogin',studentLogin)

    fastify.get('/studentdetail',studentDetail)

    fastify.get('/studentprofile/:id',studentProfile)

    fastify.put('/studprofedit/:id',studentprofileEdit)

    fastify.get('/studtopic',studentTopic)
    
    fastify.post('/topicsubmisson',topicSubmisson)

    fastify.put('/submitverify/:id',submitVerify)

    fastify.get('/submitdetails/:id',submittedDetail)

    done();
}