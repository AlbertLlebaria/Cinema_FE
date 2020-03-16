import {
    APP_ACTION_TYPES
} from '../actions/app.actions'


const initialState = {
    loading: false,
    displayModal: false,
}

export default function (state = initialState, action) {

    switch (action.type) {
        case APP_ACTION_TYPES.SET_LOADER:
            return {
                ...state,
                loading: action.loading
            }
        case APP_ACTION_TYPES.SET_MODAL_STATE:
            return {
                ...state,
                displayModal: action.state
            }
        default:
            return state;
    }
}