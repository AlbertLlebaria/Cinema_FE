export const USER_ACTION_TYPES = {
    SET_MOVIE: 'SET_MOVIE',
    SET_FILTER: 'SET_FILTER',
    SET_SELECTED: 'SET_SELECTED',
    SET_PAGE: 'SET_PAGE',
    SET_SORT_FILTER: 'SET_SORT_FILTER',
}

export const setRatedMovie = (movie) => (
    {
        type: USER_ACTION_TYPES.SET_MOVIE,
        movie,
    }
)

export const setSelectedMovie = (movie) => (
    {
        type: USER_ACTION_TYPES.SET_SELECTED,
        movie,
    }
)

export const setFilter = (filter) => (
    {
        type: USER_ACTION_TYPES.SET_FILTER,
        filter,
    }
)

export const setPage = (page) => (
    {
        type: USER_ACTION_TYPES.SET_PAGE,
        page,
    }
)
export const sortMovieList = (direction, filterType) => (
    {
        type: USER_ACTION_TYPES.SET_SORT_FILTER,
        direction,
        filterType
    }
)



