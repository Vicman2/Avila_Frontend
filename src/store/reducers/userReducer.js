import * as actionType from '../actions/userActions'

const initialStore = {
    isLoggedIn: false,
    cartNo : null, 
    payloadBeforeAuth: null, 
    isAdmin: false
}


const reducer = (state = initialStore, action) => {
    switch(action.type){
        case actionType.LOGMEIN:
            return{
                ...state,
                isLoggedIn : true,
                isAdmin: action.isAdmin

            }
        
        case actionType.LOGOUT:
            return{
                ...state,  
                isLoggedIn: false, 
                cartNo: null,
            }
        case actionType.UPDATE_NO_OF_CART: 
            return{
                ...state, 
                cartNo: action.num
            }
        case actionType.ACTION_BEFORE_AUTH: 
            return{
                ...state, 
                payloadBeforeAuth: action.payload
            }
        default: 
            return state
    }
}

export default reducer