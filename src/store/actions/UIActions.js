export const PROMPT_NOTIFICATION = "PROMPT_NOTIFICATION"
export const CANCEL_NOTIFICATION = "CANCEL_NOTIFICATION"
export const SET_COMPONENT_ON_AUTH = "SET_COMPONENT_ON_AUTH"


export const promptNotification = (payload)=>{
    return {type: PROMPT_NOTIFICATION, payload:payload}
}
export const cancelNotification = () => {
    return {type: CANCEL_NOTIFICATION}
}
export const setComponentOnAuth = (comp) => {
    return {type: SET_COMPONENT_ON_AUTH, comp}
}
