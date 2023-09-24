interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    templatePath: string,
    variables: any
  ): Promise<void>;
}

export { IMailProvider };
