// declaring the routes for faculty
const { addFaculty,facultyLogin,facultyDetail,facultyProfile,profileEdit,facultyDelete,addTopic,topicDetail,topicDelete,topicEdit,singleTopic,addComment,topicSubmitted,checkPlag} = require("../controllers/faculty")
module.exports = async function (fastify, opts, done) {

    fastify.post('/addfaculty',addFaculty)

    fastify.post('/facultylogin',facultyLogin)

    fastify.get('/facultydetails',facultyDetail)

    fastify.get('/facultydetails/:id',facultyProfile)

    fastify.put('/profedit/:id',profileEdit)

    fastify.delete('/deletefaculty/:id',facultyDelete)

    fastify.post('/addtopic',addTopic)

    fastify.get('/topicdetails/:id',topicDetail)

    fastify.get('/singletopic/:id',singleTopic)

    fastify.delete('/deletetopic/:id',topicDelete)

    fastify.put('/topicedit/:id',topicEdit)

    fastify.put('/addcomment/:id',addComment)

    fastify.get('/topicsubmitted/:id',topicSubmitted)

    fastify.get('/checkplagiarism/:id',checkPlag)

    done();
}