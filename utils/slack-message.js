const isMarkdownLink = require('is-markdown-link')
const {priority_colors} = require('./todoist-utils')
const {extractLink} = require('./markdown')

exports.createNextActionAttachment = function (task) {
    let title = task.content
    let titleLink

    if (isMarkdownLink(task.content)) {
        const matchMarkdownLink = /(?:__|[*#])|\[(.*?)\]\(.*?\)/
        const markdownLink = task.content.match(matchMarkdownLink)[0]
        const rest = task.content.replace(markdownLink, '')
        const link = extractLink(markdownLink)
        title = link.text + ' ' + rest
        titleLink = link.href
    }

    return {
        // "fallback": "Required plain-text summary of the attachment.",
        color: priority_colors[task.priority],
        // "pretext": "Optional text that appears above the attachment block",
        author_name: task.project_name,
        // "author_link": "http://flickr.com/bobby/",
        // "author_icon": "images/td_logo.svg",
        title: title,
        title_link: titleLink
        // "text": action.project_name,
        // "fields": [
        //     {
        //         "title": "Priority",
        //         "value": "High",
        //         "short": false
        //     }
        // ],
        // "image_url": "http://my-website.com/path/to/image.jpg",
        // "thumb_url": "http://example.com/path/to/thumb.png",
        // "footer": "Slack API",
        // "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
        // "ts": 123456789
    }
}

exports.createEmailAttachment = function (task) {
    let title = task.content
    let titleLink
    let from

    if (isMarkdownLink(task.content)) {
        const matchMarkdownLink = /(?:__|[*#])|\[(.*?)\]\(.*?\)/
        const markdownLink = task.content.match(matchMarkdownLink)[0]
        from = task.content.replace(markdownLink, '')
        const link = extractLink(markdownLink)
        title = link.text
        titleLink = link.href
    }

    return {
        // "fallback": "Required plain-text summary of the attachment.",
        color: priority_colors[task.priority],
        // "pretext": "Optional text that appears above the attachment block",
        // "author_link": "http://flickr.com/bobby/",
        // "author_icon": "images/td_logo.svg",
        title: title,
        title_link: titleLink,
        text: from
        // "text": action.project_name,
        // "fields": [
        //     {
        //         "title": "Priority",
        //         "value": "High",
        //         "short": false
        //     }
        // ],
        // "image_url": "http://my-website.com/path/to/image.jpg",
        // "thumb_url": "http://example.com/path/to/thumb.png",
        // "footer": "Slack API",
        // "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
        // "ts": 123456789
    }
}
