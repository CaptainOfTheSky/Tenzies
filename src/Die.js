import React from "react";

export default function Die(props) {

    return (
        <div className={`die ${props.frozen ? "frozen" : ""}`} onClick={(e) => props.handleClick(e, props.id)}>
            {props.value}
        </div>
    )
}