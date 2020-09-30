import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './scss/styles.scss'
import Startup from './Startup';
import Question from './Question'

function App() {

  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  // game state
  const [gameStatus, setGameStatus] = useState('setup')
  const [numQuestions, setNumQuestions] = useState(0)
  const [round, setRound] = useState(0)
  const [points, setPoints] = useState(0)

  const getQuestions = (url) => {
    axios.get(url)
      .then(res => {
        const data = res.data;
        setQuestions(data.results)
        setIsLoading(false)
        setGameStatus('playing')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const nextQuestion = () => {
    console.log('clicked me :)')
  }

  const getResults = (result) => {
    console.log(`Results: ${result}`)
  }

  let currQuestion = gameStatus === 'playing' ? (
    <Question question={questions[round]} nextQuestion={nextQuestion} getResults={getResults} />
  ) : ''

  return (
    <div className="App">
      <h1>Trivia App</h1>
      <Startup getQuestions={getQuestions} />
      {currQuestion}
    </div>
  );
}

export default App;
