// queue.js
const Queue = require("bull");
const sendEmail = require("./sendEmail");

const emailQueue = new Queue("emails", {
  redis: { host: process.env.REDIS_HOST || "127.0.0.1", port: 6379 },
});

emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  await sendEmail(to, subject, html);
});

module.exports = emailQueue;

// Usage in forgotPassword:
emailQueue.add({
  to: email,
  subject: "Reset Your Password",
  html: htmlContent,
});
