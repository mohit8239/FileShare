import nodemailer from 'nodemailer'

async function sendMail({ from,to,subject,text,html }){
    let transporter = nodemailer.createTransport({
        host:process.env.HOST,
        port:process.env.STMP_Port,
        secure:false,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS

        }
    })

    let info = await transporter.sendMail({
        from:from,
        to:to,
        subject:subject,
        text:text,
        html:html
    })

}


export default sendMail