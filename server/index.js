const fastify = require('fastify')()

fastify.register(require('fastify-cors'),{
})

// regesitering the routes
fastify.register(require('./src/routes/student'))
fastify.register(require('./src/routes/admin'))
fastify.register(require('./src/routes/faculty'))

const mongoose = require('mongoose');

//  mango db mongoose atlas connection
// mongoose.connect('mongodb+srv://admin:admin123@mycluster.n4gnk.mongodb.net/PlagiarismDetection?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log("Mongo is ready !"))
// .catch(err=> console.log(err))

// mango db mongoose local connection
mongoose.connect('mongodb://localhost:27017/PlagiarismDetection', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Mongo is ready !"))
.catch(err=> console.log(err))


  
//Declare a basic route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

// running the port
fastify.listen(5000, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})