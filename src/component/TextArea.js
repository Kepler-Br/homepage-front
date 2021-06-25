import React from 'react';

function TextArea(props) {
    return (
        <div className={props.className}>
            <label htmlFor={props.id} className="form-label">{props.labelText}</label>
            <textarea className="form-control" id={props.id} rows={"rows" in props ? props.rows : "3"}/>
        </div>
    );
}

export default TextArea;