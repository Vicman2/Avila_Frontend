import * as actionType from '../actions/UIActions'

const initialStore = {
    showNotification:false, 
    notificationData : {
        status: "", 
        content:""
    }, 
    unAuthComponent: null, 
    showFooter: true
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
        case actionType.SHOW_FOOTER:
            return{
                ...state, 
                showFooter: true,
            }
        case actionType.HIDE_FOOTER:
            return{
                ...state, 
                showFooter: false,
            }
    }
    return state;
}

export default reducer