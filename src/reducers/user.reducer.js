import {
    USER_ACTION_TYPES
} from '../actions/user.actions'

const initialState = {
    movies: [],
    filter: "",
    selected: null,
    page: 1
}

export default function (state = initialState, action) {
    switch (action.type) {
        case (USER_ACTION_TYPES.SET_FILTER):
            return {
                ...state,
                filter: action.filter,
                page: 1
            }
        case (USER_ACTION_TYPES.SET_PAGE):
            return {
                ...state,
                page: action.page
            }
        case (USER_ACTION_TYPES.SET_MOVIE):
            const movies = state.movies.filter(movie => movie.Title !== action.movie.Title)
            return {
                ...state,
                movies: [
                    ...movies,
                    action.movie
                ]
            }
        default:
            return state;
    }
}