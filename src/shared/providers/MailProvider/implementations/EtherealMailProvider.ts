import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }

  async sendMail(
    to: string,
    subject: string,
    templatePath: string,
    variables: any
  ): Promise<void> {
    const templateContent = fs.readFileSync(templatePath).toString("utf-8");
    const templateParse = handlebars.compile(templateContent);
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentalx <noreply@rentalx.com.br>",
      subject,
      html: templateHTML,
    });

    console.log(nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
