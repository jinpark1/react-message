const initialState = {
    userData: {},
}

const UPDATE_USERDATA = "UPDATE_USERDATA";

export default function reducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_USERDATA:
        return {...state, userData: action.payload};
        default:
            return state;
    }
}

export function updateUserData( userData ){
    return {
        type: UPDATE_USERDATA,
        payload: userData
    }
} 