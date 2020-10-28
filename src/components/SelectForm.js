import React from 'react'

const SelectForm = (props) => {
    return (
        <div className="SelectForm">
            <select
                onChange={props.change}
                name={props.name}
                value={props.value}
                defaultValue={props.place}>
                    <option disabled hidden>{props.place}</option>
                    { props.items.map((cat, index) => <option key={index} value={index}>{cat}</option>) }
            </select>
            <hr className="formLineInput" />
        </div>
    )
}

export default SelectForm
