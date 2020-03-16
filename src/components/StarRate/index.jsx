import React, { useState } from "react"
import classnames from "classnames"
import "./style.css"

const StarRate = props => {
    const [rate, setRate] = useState(Array(5).fill(0));
    const current_rate = props.rate || -1

    const handleHover = (starIndex) => {
        let newRate = Array(5).fill(0).map((_, index) => index <= starIndex ? 1 : 0)
        setRate(newRate)
    }

    return (
        <div
            onMouseLeave={() => {
                if (current_rate === -1)
                    handleHover(-1)
            }}>
            {rate.map((checked, index) => {
                const startSpanClassname = classnames("fa fa-star fa-star--custom", {
                    checked: (checked !== 0 || index <= current_rate)
                })
                return (
                    <span
                        key={index}
                        className={startSpanClassname}
                        onClick={() => props.handleClick(index)}
                        onMouseOver={() => handleHover(index)}></span>
                )
            })}
        </div>
    )
}


export default StarRate;