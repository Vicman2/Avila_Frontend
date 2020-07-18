export const LOGMEIN = "LOGMEIN"
export const LOGOUT = 'LOGOUT'

export const login = (payload)=>{
    return {type: LOGMEIN, payload:payload}
}

export const logOut = () => {
    return {type: LOGOUT}
}