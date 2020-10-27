import React from 'react'

const InputForm = (props) => {
    return (
        <div className="InputForm">
            <input
                type="text" 
                onChange={props.change} 
                name={props.name} 
                maxLength={props.maxLength}
                placeholder={props.place}>
            </input>
            <hr className="formLineInput" />
        </div>
    )
}

export default InputForm
