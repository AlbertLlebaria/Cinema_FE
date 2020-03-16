import React, { useEffect, useState } from "react"

import { connect } from 'react-redux';
import {
    setFilter,
    setPage
} from "../../actions/user.actions"
import {
    setLoaderState
} from "../../actions/app.actions"

import {
    setSelectedMovie,
} from "../../actions/movie.actions"
import List from "../List"
import Modal from "../Modal"
import IconButton from "../IconButton"
import classnames from "classnames"
import "./style.css"



const FilterComponents = (props) => {
    const [display, setDisplayState] = useState(false);
    const [sortFilters, setSortFilters] = useState({
        name: false,
        rate: false
    });

    const filterClassname = classnames("movie_searcher__filters_content", {
        "display-n": !display
    });

    const rateIcon = sortFilters.rate ? "up" : "down"
    const nameIcon = sortFilters.name ? "up" : "down"

    const handleFilter = (type) => {
        props.sortMovies(!sortFilters[type], type)

        setSortFilters({
            ...sortFilters,
            [type]: !sortFilters[type]
        })
    }

    return (
        <div className={"movie_searcher__filters_container"}>
            <button
                onClick={() => setDisplayState(!display)}
                className="filters_button">Filters: </button>
            <div className={filterClassname}>
                <IconButton
                    text="Name"
                    size="small"
                    handleClick={() => handleFilter("name")}
                    icon={`arrow-${nameIcon}`}>

                </IconButton>
                <IconButton
                    text="Rate"
                    size="small"
                    handleClick={() => handleFilter("rate")}
                    icon={`arrow-${rateIcon}`}>
                    Rate
                </IconButton>
            </div>
        </div>
    )
};



const MovieRatedList = (props) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        setMovies(props.movies);
    }, [props.movies]);

    const handleSearch = (filter = "", page) => {
        let filteredMovies = props.movies.filter(movie => movie.Title.toLowerCase().includes(filter.toLowerCase()))
        setMovies(filteredMovies)
    };

    const handleCloseModal = () => {
        props.setSelectedMovie(null)
    };

    const handleSort =(direction, type)=>{
        props.setLoaderState(true)
        function compare(a, b) {
            if (a[key] > b[key]) return 1;
            if (b[key] > a[key]) return -1;
          
            return 0;
          }

        var key = type ==="name" ?"Title":"UserRate"
        
        if(direction){
            setMovies(movies.sort(compare))
        }else{
            setMovies(movies.sort(compare).reverse())
        }
        props.handlePage(1);
        props.setLoaderState(false)

    }

    return (
        <>
            <Modal
                handleCloseModal={handleCloseModal} />
            <div className="movie_searcher__container">
                <h2 style={{ color: "#dd6031", 'textAlign': 'center' }}>Your rated movies</h2>
                <FilterComponents
                    sortMovies={handleSort}
                 />
                <List
                    handleInputSearch={props.setFilter}
                    handleSearch={handleSearch}
                    handlePage={props.handlePage}
                    list={movies}
                    filter={props.filter}
                    total={movies.length}
                    page={props.page}
                ></List>
            </div>
        </>
    )
}



const mapStateToProps = (state, ownProps) => ({
    movies: state.user.movies,
    filter: state.user.filter,
    page: state.user.page,

})

const mapDispatchToProps = dispatch => {
    return {
        setFilter: (filter) => dispatch(setFilter(filter)),
        setSelectedMovie: (movie) => dispatch(setSelectedMovie(movie)),
        handlePage: (page) => dispatch(setPage(page)),
        setLoaderState: (state)=> dispatch(setLoaderState(state))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieRatedList)
