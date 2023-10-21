import Mail from 'nodemailer/lib/mailer'

export interface MailerOptions {
  host: string
  port: number
  user: string
  pass: string
  from?: string
  to?: Mail.Options['to']
  subject?: string
}
