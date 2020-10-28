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
                >
            </input>
            <hr className="formLineInput" />
        </div>
    )
}

export default InputForm
