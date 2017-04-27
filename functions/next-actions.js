const todoist = require('../lib/todoist')
const { webhook } = require('../lib/slack')
const { createNextActionAttachment } = require('../utils/slack-message')
const sortBy = require('lodash/sortBy')

exports.handle = function(event, context, callback) {
    todoist.getNextActions().then(nextActions => {
        const attachments = sortBy(nextActions, a => a.priority)
            .reverse()
            .map(createNextActionAttachment)

        const message = {
            text: 'Next actions list',
            channel: '#general',
            link_names: 1,
            username: 'todoist',
            // "as_user": false,
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
