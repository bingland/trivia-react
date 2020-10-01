import React from 'react';

// PROPS: points, numQuestions, playAgain()
const GameOver = (props) => {

    return (
        <div className="GameOver">
            <h1>Final Score</h1>
            <div className="score">{props.points} / {props.numQuestions}</div>
            <button onClick={props.playAgain}>Play Again</button>
        </div>
    )
}

export default GameOver