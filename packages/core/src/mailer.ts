import { Transporter, createTransport } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

import { DEFAULT_SUBJECT } from './constants'
import { HTMLGenerator } from './html-generator'
import { LogContent, MailerOptions } from './types'

export class Mailer {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>
  private htmlGenerator: HTMLGenerator

  constructor(private options: MailerOptions) {
    const { host, port, user, pass } = options

    this.transporter = createTransport({
      host,
      port,
      secure: true,
      auth: {
        user,
        pass,
      },
    })

    this.htmlGenerator = new HTMLGenerator()
  }

  public async consumeLogContentList(logContentList: LogContent[]) {
    const { from, to, subject = DEFAULT_SUBJECT, user } = this.options

    await this.transporter.sendMail({
      from: from ?? user, // sender address
      to: to ?? user, // list of receivers
      subject: subject ?? DEFAULT_SUBJECT, // Subject line
      html: this.htmlGenerator.render({ subject, logContentList }), // html body
    })
  }
}
