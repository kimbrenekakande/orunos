import { sendEmail } from './lib/resend'
import { ConfirmEmail } from "@/components/emails/emailConfirmation"

async function testEmail() {
  try {
    await sendEmail({
      to: 'kimbrenekakande@gmail.com',
      subject: 'Welcome to Orunos',
      react: <ConfirmEmail validationCode="123456" />,
    })
    console.log('Test email sent successfully!')
  } catch (error) {
    console.error('Failed to send test email:', error)
  }
}

testEmail()