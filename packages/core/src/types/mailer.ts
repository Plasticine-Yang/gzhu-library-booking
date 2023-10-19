export interface MailerOptions {
  host: string
  port: number
  user: string
  pass: string
  from?: string
  to?: string
  subject?: string
}
