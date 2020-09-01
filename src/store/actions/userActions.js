export const LOGMEIN = "LOGMEIN"
export const LOGOUT = 'LOGOUT'
export const UPDATE_NO_OF_CART = "UPDATE_NO_OF_CART"

export const login = ()=>{
    return {type: LOGMEIN}
}

export const logOut = () => {
    return {type: LOGOUT}
}

export const updateNoOfCart = (num)=>{
    return {type: "UPDATE_NO_OF_CART", num }
}