const aws = 0;
const config = require("../config/config");
let awsConfig = {
  accessKeyId: "config.email.accessKey",
  secretAccessKey: "config.email.secretKey",
  region: "config.s3.region",
};
console.log("Send mail config :  ", awsConfig);
// aws.config.update(awsConfig);
// const SES = new aws.SES();

async function getTemplateBody(file, data = {}) {
  return new Promise((resolve) => {
    ejs.renderFile(
      path.resolve(__dirname, `../public/mail_templates/${file}.html`),
      data,
      {},
      (err, str) => {
        console.log("herml------------------------>", str);
        if (err) {
          console.log("getTemplateBody : err : ", err);
          return resolve(null);
        }
        resolve(str);
      }
    );
  });
}

function sendMail(to, data, subject) {
  console.log("sendMail : to : ", to);
  // console.log("sendMail : data : ", data);
  let subjectName = subject ? subject : "Layman_node";
  return new Promise(async (resolve) => {
    // Create sendEmail params
    var params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: data,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subjectName,
        },
      },
      Source: "help@laymen.gg",
    };
    // Create the promise and SES service object
    // var sendPromise = SES.sendEmail(params).promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then((data) => {
        console.log("sendMail : seccuss : ", data.MessageId);
        resolve(true);
      })
      .catch((err) => {
        console.log("sendMail : error   : ", err, err.stack);
        resolve(false);
      });
  });
}

module.exports = {
  sendMail,
  getTemplateBody,
};
