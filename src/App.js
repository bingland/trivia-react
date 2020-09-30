import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './scss/styles.scss'
import Startup from './Startup';

function App() {

  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  const getQuestions = (url) => {
    axios.get(url)
      .then(res => {
        const data = res.data;
        setQuestions(data.results)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

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
      <h1>Trivia App</h1>
      <Startup getQuestions={getQuestions} />
      <ul>
        {questionList}
      </ul>
      
    </div>
  );
}

export default App;
