import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './scss/styles.scss'
import Startup from './Startup';

function App() {

  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  const getQuestions = () => {
    axios.get(`https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple`)
      .then(res => {
        const data = res.data;
        setQuestions(data.results)
        setIsLoading(false)
      })
  }
  
  // initial useEffect
  useEffect(() => {
    getQuestions()
  }, [])

  let questionList
  if (!isLoading) {
    questionList = questions.map((item, index) => {
      return <li key={index}>{item.question}</li> 
    })
  } else {
    questionList = <div>Loading....</div>
  }

  return (
    <div className="App">
      <h1 className="green">Trivia App</h1>
      <Startup />
      <ul>
        {questionList}
      </ul>
    </div>
  );
}

export default App;
