require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');
const {sendEmail} = require("./services/email.service");


let server;

mongoose.connect(process.env.MONGODB_URL).then(()=> {
    server = app.listen(process.env.PORT, async () => {
        console.log('welcome to digirentall server!')
        console.log('connected to mongoose');
        console.log('server run at port', process.env.PORT)
        const response = await sendEmail();
        console.log(response)

    })
})
