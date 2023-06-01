const nodemailer = require('nodemailer');
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const OAuth2_client = new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET)
OAuth2_client.setCredentials({refresh_token: process.env.CLIENT_TOKEN})
const accessToken = OAuth2_client.getAccessToken()

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.SMTP_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET, 
                refreshToken: process.env.CLIENT_TOKEN,
                accessToken
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Activation account on Viktor Inc.',
            text: '',
            html:
                `
                    <div>
                        <h1>For activation press on this link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

    async sendCodeMail(to, code){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Forgot Password',
            text: '',
            html:
                `
                    <div>
                        <h1>Enter this code</h1>
                        <h3>Code:${code}</h3>
                    </div>
                `
        })
    }

    async sendTempPass(to, password){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Temporary password',
            text: '',
            html:
                `
                    <div>
                        <h1>Use this password to login to your account</h1>
                        <h3>Temporary password:${password}</h3>
                        <h3>Please change password after login</h3>
                    </div>
                `
        })
    }
}

module.exports = new MailService();
