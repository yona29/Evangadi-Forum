const sendpulse = require("sendpulse-api");
require("dotenv").config();

const API_USER_ID = process.env.SENDPULSE_USER_ID;
const API_SECRET = process.env.SENDPULSE_SECRET;
const TOKEN_STORAGE = "/tmp/"; // Temporary folder for tokens

// Initialize SendPulse SDK
sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE);

/**
 * Send email via SendPulse API
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content
 */
async function sendEmail(to, subject, text, html) {
  return new Promise((resolve, reject) => {
    const email = {
      html,
      text,
      subject,
      from: {
        name: process.env.SENDPULSE_FROM_NAME,
        email: process.env.SENDPULSE_FROM_EMAIL,
      },
      to: [{ email: to }],
    };

    sendpulse.smtpSendMail((data) => {
      if (data.result) {
        console.log("📧 Email sent successfully:", data);
        resolve(data);
      } else {
        console.error("❌ SendPulse Error:", data);
        reject(data);
      }
    }, email);
  });
}


module.exports = sendEmail;
