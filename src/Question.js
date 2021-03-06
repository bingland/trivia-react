import React, { useState, useEffect } from 'react'

const Question = (props) => {
    

    const [userAnswer, setUserAnswer] = useState(null);
    const [answers, setAnswers] = useState([])
    const [checkDisabled, setCheckDisabled] = useState(false)
    const [results, setResults] = useState(null)

    // runs every time props change
    useEffect(() => {
        const shuffleAnswers = () => {
            return [props.question.correct_answer, ...props.question.incorrect_answers].sort(() => Math.random() - 0.5)
        }
        setAnswers(shuffleAnswers())
        setUserAnswer(null)
        setCheckDisabled(false)
        setResults(null)
    }, [props.question])

    // TODO: put selectAnswer into a useEffect function? 

    const selectAnswer = (e) => {
        if (userAnswer == null) {
            let attr = Number(e.target.getAttribute('data-id'))
            setUserAnswer(Number(e.target.getAttribute('data-id')))
            //console.log(e.target.getAttribute('data-id'))

            let correct = answers[attr] === props.question.correct_answer ? true : false
            //console.log(`${answers[attr]} === ${props.question.correct_answer}`)

            setResults(correct)
            
            props.getResults(correct)
        }
        setCheckDisabled(true) // do i need this?

        
    }

    const nextQuestion = () => {
        props.nextQuestion()
    }

    const decode = (code) => {
        let txt = document.createElement("textarea");
        txt.innerHTML = code;
        return txt.value;
    }

    let result = null
    if (results !== null) {
        //console.log(`Result: ${result} !== null`)
        result = results ? <div className="result correct"><b>Correct!</b></div> : <div className="result incorrect"><b>Incorrect!</b> Answer was {decode(props.question.correct_answer)}</div>
    }

    return (
        <div className="Question">
            <div className="questionBar">
                <div className="category">{props.question.category}</div>
                <div className="difficulty">Difficulty: {props.question.difficulty}</div>
            </div>
            <div className="question">{decode(props.question.question)}</div>
            <div className="answers">
                {
                    answers.map((answer, index) => (
                        <div className={userAnswer === index ? 'answer answerActive': 'answer'} key={index} data-id={index} onClick={selectAnswer}>{decode(answer)}</div>
                    ))
                }
            </div>
            <div className="results">
                { result }
                {checkDisabled && (
                    <button className="submitQuestion" onClick={nextQuestion}>Next Question</button>
                )}
            </div>
            
        </div>
    )
}

export default Question