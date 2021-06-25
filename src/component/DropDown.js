import React from 'react';

function DropDown(props) {
    return (
        <div className={props.className}>
            <label htmlFor={props.id} className="form-label">{props.labelText}</label>
            <select className="form-select" id={props.id}>
                <option disabled selected value="">
                    {"defaultValue" in props ? props.defaultValue : "Choose..."}</option>
                {props.items.map(
                    (item) => {
                        return <option key={item}>{item}</option>
                    }
                )}
            </select>
            <div className="invalid-feedback">
                Please select visibility.
            </div>
        </div>
    );
}

export default DropDown;