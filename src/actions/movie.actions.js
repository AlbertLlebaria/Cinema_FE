import {
    OMDB_instance,
    source
} from "../axios"
import { setLoaderState } from "./app.actions"
import { setRatedMovie } from "./user.actions";

export const MOVIE_ACTION_TYPES = {
    SET_MOVIE_FILTER: "SET_MOVIE_FILTER",
    SET_MOVIE_ERROR: "SET_MOVIE_ERROR",
    SET_SELECTED_MOVIE: "SET_SELECTED_MOVIE",
    SET_MOVIE_LIST_PAGE: "SET_MOVIE_LIST_PAGE",
    SET_MOVIE_SUGGESTION: "SET_MOVIE_SUGGESTION",
    SET_MOVIE_RATE: "SET_MOVIE_RATE",

}


export const setMovieRate = (rate, movie) => {
    return (dispatch) => {
        dispatch({
            type: MOVIE_ACTION_TYPES.SET_MOVIE_RATE,
            rate
        });
        dispatch(setRatedMovie({
            ...movie,
            UserRate: rate
        }))
    }
};

export const setMovieFilter = (filter) => ({
    type: MOVIE_ACTION_TYPES.SET_MOVIE_FILTER,
    filter
});


export const setMovieListPage = (page) => ({
    type: MOVIE_ACTION_TYPES.SET_MOVIE_LIST_PAGE,
    page
});


export const fetchFilteredMovieSearchSuccess = ({ list, total }) => ({
    type: MOVIE_ACTION_TYPES.SET_MOVIE_SUGGESTION,
    list,
    total
});

export const fetchFilteredMovieSearch = (filter = "", page = 1) => {
    return (dispatch) => {
        dispatch(setLoaderState(true))
        return OMDB_instance.get("", {
            cancelToken: source.token,
            params: {
                s: filter,
                apikey: "4ae0febc",
                type: "movie",
                page
            }
        })
            .then(res => {
                if (res.data.Response === "True") {
                    dispatch(fetchFilteredMovieSearchSuccess({
                        list: res.data.Search,
                        total: parseInt(res.data.totalResults)
                    }))
                    return dispatch(setMovieListPage(page))
                }
                else {
                    throw new Error('Movie not found')
                }
            })
            .catch(el => {
                return dispatch(({
                    type: MOVIE_ACTION_TYPES.SET_MOVIE_ERROR
                }))
            })
            .finally(() => {
                return dispatch(setLoaderState(false))
            })
    }
};

export const setSelectedMovie = movie => ({
    type: MOVIE_ACTION_TYPES.SET_SELECTED_MOVIE,
    movie
});

export const fetchMovieDetails = movie_id => {
    return (dispatch, getState) => {
        let movie_index = getState().user.movies.findIndex(movie => movie.imdbID === movie_id);
        if (movie_index >= 0) {
            return dispatch(setSelectedMovie(getState().user.movies[movie_index]))
        } else {
            dispatch(setLoaderState(true))
            return OMDB_instance.get("", {
                cancelToken: source.token,
                params: {
                    i: movie_id,
                    apikey: "4ae0febc",
                    type: "movie",
                }
            })
                .then(res => {
                    if (res.data.Response === "True") {
                        let stored_movie = getState().user.movies.filter(movie => movie.Title === res.data.Title);
                        let movie = res.data;
                        if (stored_movie.length === 1) {
                            movie = {
                                ...movie,
                                UserRate: stored_movie[0].UserRate
                            }
                        }
                        return dispatch(setSelectedMovie(movie))
                    }else{
                        throw new Error('Movie not found')
                    }
                })
                .catch(el => {
                    return dispatch(({
                        type: MOVIE_ACTION_TYPES.SET_MOVIE_ERROR
                    }))
                })
                .finally(() => {
                    return dispatch(setLoaderState(false))
                })
        }
    }
};