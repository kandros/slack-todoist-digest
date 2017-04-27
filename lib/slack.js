const IncomingWebhook = require('@slack/client').IncomingWebhook
const url = process.env.SLACK_WEBHOOK_URL || ''
const webhook = new IncomingWebhook(url)

exports.webhook = webhook