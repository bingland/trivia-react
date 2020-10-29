import React, { useContext } from 'react';
import { LoginContext } from './context/login-context'


const Scoreboard = (props) => {
    const loginContext = useContext(LoginContext)

    return (
        <div className="Scoreboard">
            <div className="wrapper">
                <div className="username">{loginContext.globalUsername}</div>
                <div className="round">Round: {props.round + 1}/{props.numQuestions}</div>
                <div className="points">Points: {props.points}</div>
            </div>
        </div>
    )
}

export default Scoreboard