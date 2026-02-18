import { Resend } from "resend"
import { emailValues } from "./types"
import { render } from "@react-email/components"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendEmail({to, subject, react} : emailValues) {
  if (!resend) {
    console.warn('Resend API key not configured, email not sent')
    return
  }
  await resend.emails.send({
    from :'Acme <onboarding@resend.dev>',
    to : to,
    subject : subject,
    html: await render(react)
  })
}
