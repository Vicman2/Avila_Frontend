export const LOGMEIN = "LOGMEIN"
export const LOGOUT = 'LOGOUT'
export const UPDATE_NO_OF_CART = "UPDATE_NO_OF_CART"
export const ACTION_BEFORE_AUTH = "ACTION_BEFORE_AUTH"

export const login = ()=>{
    return {type: LOGMEIN}
}

export const logOut = () => {
    return {type: LOGOUT}
}

export const updateNoOfCart = (num)=>{
    return {type: UPDATE_NO_OF_CART, num }
}

export const actionBeforeAuth = (payload) => {
    return {type: ACTION_BEFORE_AUTH, payload}
}