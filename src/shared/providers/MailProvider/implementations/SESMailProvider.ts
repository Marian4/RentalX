/* eslint-disable import-helpers/order-imports */
import fs from "fs";
import { SES } from "aws-sdk";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
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

    await this.client.sendMail({
      to,
      from: "Rentalx <mraes.mariana.lima@gmail.com>",
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
