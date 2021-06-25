import React, {useState} from 'react';

function RadioSetEditor(props) {
    const [inputValue, setInputValue] = useState("");
    const onChangeInput = (e) => {
        setInputValue(e.target.value);
    };
    const itemsMapper = (item) => {
        const active = "list-group-item list-group-item-action active";
        const notActive = "list-group-item list-group-item-action";
        const className = (item === props.selected) ? active : notActive;
        const onClick = (e) => {
            props.setSelected(item);
        };
        const onDeleteClick = (e) => {
            if ((props.items.size === 1) && ("forbidLastItemRemoval" in props)) {
                e.stopPropagation();
                return;
            }
            let newItems = new Set(props.items);
            newItems.delete(item);
            props.setItems(newItems);
            if (newItems.size === 0) {
                props.setSelected("");
            } else if (props.selected === item) {
                props.setSelected(newItems.values().next().value);
            }
            e.stopPropagation();
        };

        return (
            <div key={item} className={className} onClick={onClick}>
                <div className="d-flex">
                    <span>{item}</span>
                    <button type="button" className="btn-close me-0 m-auto" onClick={onDeleteClick}/>
                </div>
            </div>
        );
    };
    const onAddNewItem = (e) => {
        if (!props.items.has(inputValue)) {
            let newItems = new Set(props.items);
            newItems.add(inputValue);
            props.setItems(newItems);
            setInputValue("");
        }
    };
    const onInputKeyUp = (e) => {
        if ((e.key === "Enter") && !props.items.has(inputValue)) {
            let newItems = new Set(props.items);
            newItems.add(inputValue);
            props.setItems(newItems);
            setInputValue("");
        }
    }
    const datalistId = props.id + "datalist-options";
    const addItemButtonId = props.id + "button-add";
    const filteredDatalist = [...props.datalist].filter((item) => !props.items.has(item));

    return (
        <div>
            <div className="list-group">
                {[...props.items].map(itemsMapper)}
            </div>
            <div className="input-group mb-3">
                <button className="btn btn-outline-secondary" type="button" id={addItemButtonId}
                        onClick={onAddNewItem}>
                    Add
                </button>
                <input type="text" className="form-control" placeholder="Select language to add"
                       list={datalistId} value={inputValue} onChange={onChangeInput} onKeyUp={onInputKeyUp}/>
                <datalist id={datalistId}>
                    {
                        "datalist" in props && filteredDatalist.map(
                            (item) => {
                                return <option key={item} value={item}/>;
                            }
                        )
                    }
                </datalist>
            </div>
        </div>
    );
}

export default RadioSetEditor;