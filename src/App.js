import React, { useState } from 'react';
import axios from 'axios'

import './scss/styles.scss'
import Startup from './Startup';
import Question from './Question'
import Scoreboard from './Scoreboard'
import GameOver from './GameOver'
import Background from './components/Background'

function App() {
  const [questions, setQuestions] = useState({});
  //const [isLoading, setIsLoading] = useState(true)

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
        //setIsLoading(false)
        setGameStatus('playing')
        setNumQuestions(data.results.length)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const nextQuestion = () => {
    if (round + 1 === numQuestions) {
      setGameStatus('gameover')
    } else {
      setRound(round + 1)
    }
  }

  const getResults = (result) => {
    if (result) {
      setPoints(points + 1)
    }
  }

  const playAgain = () => {
    setNumQuestions(0)
    setRound(0)
    setPoints(0)
    setQuestions({})
    setGameStatus('setup')
  }

  return (
    <div className="App">
      { gameStatus === 'setup' && (
        <React.Fragment>
          <Background />
          <div className="centerVertically">
            <Startup getQuestions={getQuestions} />
          </div>
        </React.Fragment>
      )}
      { gameStatus === 'playing' && (
        <React.Fragment>
          <Scoreboard round={round} points={points} numQuestions={numQuestions}/>
          <Question question={questions[round]} nextQuestion={nextQuestion} getResults={getResults} />
        </React.Fragment>
      )}
      { gameStatus === 'gameover' && (
        <React.Fragment>
          <Background />
          <div className="centerVertically">
            <GameOver points={points} numQuestions={numQuestions} playAgain={playAgain} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
