const marked = require('marked')

exports.extractLink = function (markdownLink) {
    let link = ''

    const renderer = new marked.Renderer()
    renderer.link = function(href, title, text) {
        link = {
            href,
            title,
            text
        }
        return marked.Renderer.prototype.link.apply(this, arguments)
    }

    marked(markdownLink, { renderer: renderer })

    return link
}
