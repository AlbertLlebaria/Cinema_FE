import React, { useState } from 'react'
import PropTypes from 'prop-types';
import ListItem from './ListItem'
import { connect } from 'react-redux';
import IconButton from "../IconButton"

import './style.css'


const ListComponent = props => {

    const [timeoutId, setTimeoutId] = useState(null);
    const timeout = 500;


    const handleKeyUp = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        setTimeoutId(setTimeout(_ => {
            props.handleSearch(props.filter, 1)
        }, timeout))
    };

    const handlePage = val => {
        if (val > 0) {
            if (props.list.length <= props.page * 10)
                props.handleSearch(props.filter, props.page + 1)
            else
                props.handlePage(props.page + 1)

        } else {
            props.handlePage(props.page - 1)
        }
    };

    const previousDisabled = props.page <= 1;
    const nextDisabled = props.page * 10 >= props.total;
    const movies = props.list.slice((props.page - 1) * 10, props.list.length >= props.total ? props.total : props.page * 10)

    return (
        <>
            <div className="list__container">
                <input
                    size="16"
                    autoComplete="off"
                    className="list__filter_input"
                    type="text"
                    id="filter"
                    onKeyUp={handleKeyUp}
                    value={props.filter.toUpperCase()}
                    onChange={(event) => props.handleInputSearch(event.target.value)} />
                <ul className="list_content">
                    {props.error ?
                        <li style={{ textAlign: 'center' }}>
                            <p>Not Found</p>
                        </li >
                        : movies.map((movie, index) => (
                            <ListItem
                                key={index}
                                movie={movie}
                            />
                        ))}
                </ul>
                {props.total > 10 && <div className="list_commands">
                    <div className="left">
                        <IconButton
                            icon="arrow-left"
                            disabled={previousDisabled}
                            handleClick={() => handlePage(-1)}>Prev.</IconButton>
                    </div>
                    <span>{props.page}/{Math.ceil(props.total / 10)}</span>
                    {<div className="right">
                        <IconButton
                            icon="arrow-right"
                            disabled={nextDisabled}
                            handleClick={() => handlePage(+1)}>Next</IconButton>
                    </div>}
                </div>}
            </div>
        </>
    );
}

ListComponent.propTypes = {
    list: PropTypes.array,
    filter: PropTypes.string
};



const mapStateToProps = (state, ownProps) => ({
    error: state.movie.movie_searches.error

})


export default connect(mapStateToProps, null)(ListComponent);