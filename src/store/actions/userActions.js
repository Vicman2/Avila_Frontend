export const LOGMEIN = "LOGMEIN"
export const LOGOUT = 'LOGOUT'

export const login = ()=>{
    return {type: LOGMEIN}
}

export const logOut = () => {
    return {type: LOGOUT}
}