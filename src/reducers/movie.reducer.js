import {
    MOVIE_ACTION_TYPES
} from '../actions/movie.actions'


const initialState = {
    movie_searches: {
        filter: '',
        list: [],
        total: 0,
        page: 1,
        error: null
    },
    selected: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case (MOVIE_ACTION_TYPES.SET_MOVIE_FILTER):
            return {
                ...state,
                movie_searches: {
                    ...state.movie_searches,
                    list: [],
                    filter: action.filter.toLowerCase(),
                    error: null
                }
            }
            case (MOVIE_ACTION_TYPES.SET_MOVIE_RATE):
                return {
                    ...state,
                    selected: {
                        ...state.selected,
                        UserRate: action.rate
                    }
                }
        case (MOVIE_ACTION_TYPES.SET_MOVIE_ERROR):
            return {
                ...state,
                movie_searches: {
                    ...state.movie_searches,
                    error: true
                }
            }
        case (MOVIE_ACTION_TYPES.SET_MOVIE_LIST_PAGE):
            return {
                ...state,
                movie_searches: {
                    ...state.movie_searches,
                    page: action.page
                }
            }
        case (MOVIE_ACTION_TYPES.SET_MOVIE_SUGGESTION):
            let newList;
            if (state.movie_searches.list.length === 0) {
                newList = action.list
            } else {
                newList = [...state.movie_searches.list, ...action.list]
            }
            return {
                ...state,
                movie_searches: {
                    ...state.movie_searches,
                    list: newList,
                    total: action.total
                }
            }
        case (MOVIE_ACTION_TYPES.SET_SELECTED_MOVIE):
            return {
                ...state,
                selected: action.movie
            }
        default:
            return state;
    }
}