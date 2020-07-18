import * as actionType from '../actions/userActions'

const initialStore = {
    isLoggedIn: false, 
    userData: {},
}


const reducer = (state = initialStore, action) => {
    switch(action.type){
        case actionType.LOGMEIN:
            return{
                ...state,
                isLoggedIn : true, 
                userData: action.payload
            }
        
        case actionType.LOGOUT:
            return{
                ...state, 
                userData:{}, 
                isLoggedIn: false
            }
    }
    return state;
}

export default reducer