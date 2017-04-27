require('dotenv').config()
const TodoistAPI = require('todoist-js').default
const todoist = new TodoistAPI(process.env.TODOIST_API_TOKEN)

exports.getNextActions = function () {
    return todoist.sync().then(state => {
        const nextLabelId = state.labels.find(label => label.name === "next").id
        const nextActions = state.items.filter(task => task.labels.includes(nextLabelId))

        return nextActions
            .filter(action => !action.checked)
            .map(action => {
            return Object.assign({}, action, {
                project_name: state.projects.find(project => project.id === action.project_id).name
            })
        })
    })
}

exports.getEmailActions = function () {
    return todoist.sync().then(state => {
        const emailsProjectId = state.projects.find(project => project.name === "emails").id
        const emailTasks = state.items.filter(task => task.project_id === emailsProjectId)

        return emailTasks.map(action => {
            return Object.assign({}, action, {
                project_name: 'emails'
            })
        })
    })
}
exports.getNextActions()