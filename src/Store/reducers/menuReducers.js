import {
    GET_TOKEN
} from "../actions/agoraActions";

var initialState = {
    menus: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case GET_TOKEN:
            return {
                menus: action.payload,
            }
    }
    return state;
}