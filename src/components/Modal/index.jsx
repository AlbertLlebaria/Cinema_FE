import React, { useState, useEffect } from "react"
import "./style.css"
import IconButton from "../IconButton"
import classnames from "classnames"
import {
    setMovieRate
} from "../../actions/movie.actions"
import { connect } from "react-redux"
import SnackBar from "../SnackBar"
import StarRate from "../StarRate"
import { MOVIE_DETAILS_FIELDS } from './modal.config'


const Modal = props => {

    const [display, setDisplayState] = useState(false);
    const [displaySnackBar, setDisplaySnackBarState] = useState(false);
    const [content, setContent] = useState(false);

    useEffect(() => {
        if (props.selected) {
            setDisplayState(true)
            setContent(parseDetails(props.selected))
        }
    }, [props.selected])

    const parseDetails = (selectedMovie) => {
        if (selectedMovie)
            return MOVIE_DETAILS_FIELDS.map(field => ({
                ...field,
                value: selectedMovie[field.name]
            }))
        else
            return null
    }

    const handleClick = (index) => {
        props.setMovieRate(index, props.selected)
        setDisplaySnackBarState(true)
    }

    const handleModalClose = () => {
        setDisplayState(false)
        props.handleCloseModal()
    }

    const modal_classname = classnames('modal__container', { 'display-n': !display });
    const user_rate = props.selected ? props.selected.UserRate : null;

    return (
        <div className={modal_classname}>
            <div className="modal__content">
                <div className="modal__header">
                    <div className="modal_close_button">
                        <IconButton icon="close" handleClick={handleModalClose} />
                    </div>
                </div>
                {content && content.map((element, key) => {
                    if (element.type === 'star') {
                        const imdbRating = parseInt(element.value)
                        return (
                            <div key={key}>
                                <div className="modal__element">
                                    <label className="modal__element_label">
                                        IMDb Rate
                                </label>
                                    <p>
                                        <span className="fa fa-star checked" ></span>
                                        {imdbRating || 0}
                                    </p>
                                </div>
                                <div className="modal__element">
                                    <label className="modal__element_label">
                                        Your rate:
                                    </label>
                                    <StarRate
                                        rate={user_rate}
                                        handleClick={handleClick} />

                                </div>
                            </div>
                        )
                    } else if (element.type === 'textarea') {
                        return (
                            <div key={key} className="modal__element">
                                <label className="modal__element_label">{element.name}</label>
                                <textarea
                                    className="modal__element_text_area"
                                    disabled={true}
                                    value={element.value}
                                    rows="4"
                                    cols="90">
                                </textarea>
                            </div>
                        )
                    } else {
                        return (
                            <div key={key} className="modal__element">
                                <label className="modal__element_label">{element.name}</label>
                                <input
                                    className="modal__element_input"
                                    type={element.type}
                                    disabled={true}
                                    value={element.value}
                                />
                            </div>
                        )
                    }
                })}
            </div>
            <SnackBar
                text="Movie has been rated"
                timeout={90000}
                display={displaySnackBar} />
        </div >
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected: state.movie.selected,
    }

}
const mapDispatchToProps = dispatch => {
    return {
        setMovieRate: (rate, movie) => dispatch(setMovieRate(rate, movie))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal);