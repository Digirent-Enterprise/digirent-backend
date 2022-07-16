const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');


let server;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(()=> {
    server = app.listen(config.port, () => {
        console.log('connected to mongoose');
        console.log('server run at port', config.port)
    })
})
