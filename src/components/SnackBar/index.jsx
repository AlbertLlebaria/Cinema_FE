import React, { useEffect, useState } from "react"
import IconButton from "../IconButton"
import classnames from "classnames"
import "./style.css"

const SnackBar = props => {
    const [display, setDisplay] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        if (props.display) {
            setDisplay(true)
            setTimeoutId(setTimeout(_ => {
                setDisplay(false)
            }, props.timeout))
        }

    }, [props.display])

    const handleCloseClick = ()=>{
        setDisplay(false)
        clearTimeout(timeoutId)
    }

    const snack_classname = classnames('snackbar__content', { 'display-n': !display });

    if (display)
        return (
            <div className={snack_classname}>
                <div>
                    <p>{props.text}</p>
                </div>
                <IconButton
                    handleClick={handleCloseClick}
                    icon="close" />
            </div>
        )
    else return (<></>)
}

export default SnackBar;