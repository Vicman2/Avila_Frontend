import * as actionType from '../actions/userActions'

const initialStore = {
    isLoggedIn: false,
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
    }
    return state;
}

export default reducer