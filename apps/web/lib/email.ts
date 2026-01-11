import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface emailValues {
  to: string,
  subject: string,
  text : string
}

export async function sendEmail({to, subject, text} : emailValues) {
  await resend.emails.send({
    from : "onboarding@resend.dev",
    to : to, 
    subject: subject ,
    text : text
  })
}