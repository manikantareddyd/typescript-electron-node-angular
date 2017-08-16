import * as nodemailer from 'nodemailer';
import AppSecrets from '../app.secrets';

class EmailService {
    public transporter = nodemailer.createTransport({
        service: AppSecrets.email.service,
        auth: {
            user: AppSecrets.email.username,
            pass: AppSecrets.email.password
        }
    });
    public mailOptions = {
        from: AppSecrets.email.username,
        to: "manikanta.reddy.d@outlook.com", // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    };


    sendmail(url: string, pin: string) {
        this.mailOptions.html += url;
        this.mailOptions.html += "<br>" + pin;
        console.log("Sending mail", this.mailOptions.html);
        // this.transporter.sendMail(this.mailOptions)
        //     .then(info => {
        //         console.log('Message %s sent: %s', info.messageId, info.response);
        //     }).catch(error => {
        //         if (error) {
        //             return console.log(error);
        //         }
        //     })
    }
}

export default new EmailService();