const { SESClient } =  require("@aws-sdk/client-ses");
const { SES_ACCESS_KEY, SES_SECRET_KEY } = require("./constants");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION, credentials:
    {
        accessKeyId: SES_ACCESS_KEY,
        secretAccessKey: SES_SECRET_KEY
    }
 });
module.exports = { sesClient };
// snippet-end:[ses.JavaScript.createclientv3]