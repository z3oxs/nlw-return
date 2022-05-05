import { MailAdapter, SendMailData } from '../mailAdapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "fa2340e36d7ea1",
        pass: "52448082688be4"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Carlos Daniel <z3ox1s@protonmail.com>',
            subject,
            html: body,
        });
    }
}
