const todoist = require('../lib/todoist')
const { webhook } = require('../lib/slack')
const { createEmailAttachment } = require('../utils/slack-message')
const sortBy = require('lodash/sortBy')

exports.handle = function(event, context, callback) {
    todoist.getEmailActions().then(emailAction => {
        const attachments = sortBy(emailAction, a => a.priority)
            .reverse()
            .map(createEmailAttachment)

        const message = {
            text: 'emails',
            channel: '#general',
            link_names: 1,
            username: 'todoist',
            mrkdwn: true,
            // as_user: false,
            // "icon_url": "http://diylogodesigns.com/blog/wp-content/uploads/2016/02/Todoist-apps-logo-designer-canada.png",
            attachments
        }

        webhook.send(message, function(err, res) {
            if (err) {
                console.log('Error:', err)
                callback(err)
            } else {
                console.log('Message sent: ', res)
            }
            callback()
        })
    })
}
