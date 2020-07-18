import * as actionType from '../actions/productActions'

const initialStore = {
    products: null, 
}


const reducer = (state = initialStore, action) => {
    switch(action.type){
        case actionType.GET_PRODUCTS:
            return {
                ...state, 
                products: action.payload
            }
       
    }
    return state;
}

export default reducer