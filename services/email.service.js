const {MessageClient} = require('cloudmailin');

const client = new MessageClient({ username: '0db1b2f948c506de', apiKey: 'kdj2RC8u6aSgE7WgYauSFt8J'});


const mailOptions = {
    from: '7f4a11bcdac6941cd1e0@cloudmailin.net',
    to: 'vogiabao292@gmail.com',
    plain: 'test message',
    html:  '<h1>Test Message</h1>',
    subject: "hello world",
}

const sendEmail = async () => await client.sendMessage(mailOptions);


module.exports = {
    sendEmail
}


