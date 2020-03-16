import { combineReducers } from 'redux'
import movieReducer from './movie.reducer'
import appReducer from './app.reducer'
import userReducer from './user.reducer'

const todoApp = combineReducers({
    movie: movieReducer,
    app: appReducer,
    user: userReducer
})

export default todoApp