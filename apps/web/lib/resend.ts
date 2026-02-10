import { Resend } from "resend"
import { emailValues } from "./types"
import { render } from "@react-email/components"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({to, subject, react} : emailValues) {
  await resend.emails.send({
    from :'Acme <onboarding@resend.dev>',
    to : to,
    subject : subject,
    html: await render(react)
  })
}