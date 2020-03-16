import React from 'react'
import {
    Link
} from "react-router-dom";
import classnames from "classnames"
import './style.css'

const CustomNavLink = props => {

    return (
        <div className="nav__link">
            <Link to={props.route} className="nav__link_element">
                {props.text}
            </Link>
        </div>
    )
}
const Header = props => {
    return (
        <nav className="nav" >
            <div className="nav__left">
                <CustomNavLink
                    text="Home"
                    route="/" />
                <CustomNavLink
                    text="Favourite Movies"
                    route="/favourite" />
            </div>
        </nav>
    )

};


export default Header