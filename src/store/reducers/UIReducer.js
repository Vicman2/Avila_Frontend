import * as actionType from '../actions/UIActions'

const initialStore = {
    showNotification:false, 
    notificationData : {
        status: "", 
        content:""
    }, 
    unAuthComponent: null
}


const reducer = (state = initialStore, action) => {
    switch(action.type){
        case actionType.PROMPT_NOTIFICATION:
            return{
                ...state,
                showNotification: true, 
                notificationData: action.payload
            }
        
        case actionType.CANCEL_NOTIFICATION:
            return{
                ...state, 
                showNotification: false,
            }
        case actionType.SET_COMPONENT_ON_AUTH:
            return{
                ...state, 
                unAuthComponent: action.comp,
            }
    }
    return state;
}

export default reducer