import React from 'react'

const InputForm = (props) => {
    return (
        <div className="InputForm">
            <input
                type={props.type}
                onChange={props.change} 
                name={props.name} 
                maxLength={props.maxLength}
                placeholder={props.place}
                required={props.required}
                value={props.value}
                disabled={props.disabled}
                autoComplete="off"
                >
            </input>
            <hr className="formLineInput" />
        </div>
    )
}

export default InputForm
