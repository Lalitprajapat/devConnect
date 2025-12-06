const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress, body) => {
  return new SendEmailCommand({
    Destination: { ToAddresses: [toAddress] },
    Message: {
      Body: {
        Html: {charset: "UTF-8", Data: `<h1>${body}</h1>`},
        Text: { Charset: "UTF-8", Data: "Hello, you have a new connection request!" }
      },
      Subject: { Charset: "UTF-8", Data: "New Connection Request" }
    },
    Source: fromAddress,
  });
};

const run = async (toEmail, body) => {
  const command = createSendEmailCommand(
    toEmail,
    "no-reply@devconnectlalit.xyz",
    body
  );

  try {
    const result = await sesClient.send(command);
    console.log("📧 Email sent successfully:", result);
    return result;
  } catch (error) {
    console.log("❌ Email sending failed:", error);
    return error;
  }
};

module.exports = { run };
