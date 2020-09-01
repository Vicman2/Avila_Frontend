import * as actionType from '../actions/userActions'

const initialStore = {
    isLoggedIn: false,
    cartNo : null
}


const reducer = (state = initialStore, action) => {
    switch(action.type){
        case actionType.LOGMEIN:
            return{
                ...state,
                isLoggedIn : true, 
            }
        
        case actionType.LOGOUT:
            return{
                ...state,  
                isLoggedIn: false
            }
        case actionType.UPDATE_NO_OF_CART: 
            return{
                ...state, 
                cartNo: action.num
            }
        default: 
            return state
    }
}

export default reducer