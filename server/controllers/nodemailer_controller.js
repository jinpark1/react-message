const nodemailer = require('nodemailer');
//Create the transport for nodemailer 
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 465, 
    secure: false, 
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
    }
})
module.exports = {
    verifyEmail: (db, userId, email) => {
        //Define your mailOptions who, and what you want to send to.

        let code = '';
        for(let i = 0; i < 6; i++) {
            code += `${Math.floor(Math.random() * 10)}`
        }
        const currentDate = new Date().getTime();
        return db.create_code({code: +code, date: currentDate, user_id: userId}).then(codes => {
            let mailOptions = {
                from: `noreply@gmail.com`,
                to: email,
                subject: 'Verify Account and Send Code.',
                body: `<div style="width='100%'; background='lightgray'">
                        <h2>PLease verify your account ${email}</h2>
                        <div style="width='80%'; display=flex">
                            <p style="border=2px solid black">
                                ${codes[0].code}
                            </p>
                        </div>
                       </div>`
            }
            transporter.sendMail(mailOptions, (err, data) => {
                if(err) console.log('Nodemailer Verify Email Error--------', err);
                console.log('Nodemailer data------------', data);
            });
            return;
        }).catch(err => console.log('Create Code Error---------', err));
    }
}