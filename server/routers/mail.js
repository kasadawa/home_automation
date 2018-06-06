const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'profbtips@gmail.com',
        pass: 'SXoakffgi!@#'
    }
})


function sendMessage(status) {
    
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Alert Door" <profbtips@gmail.com>', // sender address
        to: 'kasadawa@gmail.com', // list of receivers
        subject: 'Door status Changed', // Subject line
        html: '<p>Your door has been: ' + status + '<p>' +
        '<h3>Note! if thats not you please contact 911</h3>'

    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (!!error) {
            console.log(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);

        }
    });
}
module.exports = sendMessage ; 