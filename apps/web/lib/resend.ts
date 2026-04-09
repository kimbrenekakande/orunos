import { Resend } from "resend"
import { emailValues } from "./types"
import { render } from "@react-email/components"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendEmail({to, subject, react} : emailValues) {
  if (!resend) {
    console.warn('Resend API key not configured, email not sent')
    throw new Error('Resend API key not configured')
  }
  try {
    const { data, error } = await resend.emails.send({
      from: 'orunos <verify@contact.orunos.com>',
      to: to,
      subject: subject,
      html: await render(react)
    })
    if (error) {
      console.error('Resend error:', error)
    }
    return { data, error }
  } catch (err) {
    console.error('Failed to send email:', err)
    throw err
  }
}
