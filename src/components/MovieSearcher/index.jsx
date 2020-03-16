import React from "react"
import List from "../List"
import { connect } from 'react-redux';
import {
    fetchFilteredMovieSearch,
    setSelectedMovie,
    setMovieFilter,
    setMovieListPage
} from "../../actions/movie.actions"
import Modal from '../Modal'

import "./style.css"



const MovieSearcher = (props) => {

    const handleCloseModal = () => {
        props.setSelectedMovie(null)
    }


    return (
        <>
            <Modal
                handleCloseModal={handleCloseModal}/>
            <div className="movie_searcher__container">
                <h2 style={{ color: "#dd6031", 'textAlign': 'center' }}>Search your movie for your COVID-19 quarantine!</h2>
                <List
                    list={props.movies}
                    handlePage={props.handlePage}
                    handleInputSearch={props.setFilter}
                    handleSearch={props.handleSearch}
                    filter={props.filter}
                    page={props.page}
                    total={props.total}
                ></List>
            </div>
        </>
    )
}



const mapStateToProps = (state, ownProps) => ({
    movies: state.movie.movie_searches.list,
    total: state.movie.movie_searches.total,
    page: state.movie.movie_searches.page,
    filter: state.movie.movie_searches.filter,
})

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        setSelectedMovie: (movie) => dispatch(setSelectedMovie(movie)),
        handleSearch: (filter, page) => dispatch(fetchFilteredMovieSearch(filter, page)),
        setFilter: (filter) => dispatch(setMovieFilter(filter)),
        handlePage: (page) => dispatch(setMovieListPage(page))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieSearcher)
