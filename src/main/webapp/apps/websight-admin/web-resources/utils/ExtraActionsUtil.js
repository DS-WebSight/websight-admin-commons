export const fetchApplicableActions = (actions, path, callback) => {
    const applicableActions = [];
    actions && actions.map((action) => {
        action.isApplicable(path, (applicable) => {
            if (applicable) {
                applicableActions.push(action)
            }
            callback(applicableActions)
        })
    })
}
