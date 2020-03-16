import React from 'react'
import StarRate from "../../StarRate"
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { fetchMovieDetails } from "../../../actions/movie.actions"
import classnames from "classnames"
import './style.css'


const ListItemComponent = props => {
    const hasImage = props.movie.Poster !== "N/A";
    const listItemInfoClassnanme = classnames("list__item_info", {
        'list__item_info--no_img': !hasImage
    });
    return (
        <li className="list__item" onClick={() => props.fetchMovieDetails(props.movie.imdbID)}>
            {hasImage && <img
                className="list__image"
                src={props.movie.Poster}
                alt="" ></img>}
            <div className={listItemInfoClassnanme}>
                <p><strong>{props.movie.Title}</strong></p>
                {props.movie.UserRate &&
                <StarRate
                    rate={props.movie.UserRate}/>}
                <p>{props.movie.Year}</p>
            </div>
        </li >
    );
}


ListItemComponent.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        imdbRating: PropTypes.string
    })
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMovieDetails: (movie_id) => dispatch(fetchMovieDetails(movie_id))
    }
}

export default connect(null, mapDispatchToProps)(ListItemComponent);