import React from 'react';

function InputMaxLimited(props) {
    const setValue = (e) => {
        props.setValue(e.target.value);
    };
    return (
        <div className={props.className}>
            <label htmlFor={props.id} className="form-label">{props.labelText}</label>
            <input className="form-control" id={props.id}
                   placeholder={"placeholder" in props ? props.placeholder : ""} value={props.value}
                   onChange={setValue}
                   maxLength={props.max}/>
            <div className="text-secondary">
                {"Symbols remaining: " + (props.max - props.value.length).toString()}
            </div>
        </div>
    );
}

export default InputMaxLimited;