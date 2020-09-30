import React, { useState, useEffect } from 'react'

const Startup = (props) => {

    // https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple
    const [numQuestions, setNumQuestions] = useState(10);
    const [category, setCategory] = useState('any');
    const [difficulty, setDifficulty] = useState('any');
    const [type, setType] = useState('any');
    


    const categories = [
        '[0] Any', '[1] General Knowledge', '[2] Entertainment: Books', '[3] Entertainment: Film', '[4] Entertainment: Music', '[5] Entertainment: Musicals & Theatres', '[6] Entertainment: Television', '[7] Entertainment: Video Games', '[8] Entertainment: Board Games', '[9] Science & Nature', '[10] Science: Computers', '[11] Science: Mathematics', '[12] Mythology', '[13] Sports', '[14] Geography', '[15] History', '[16] Politics', '[17] Art', '[18] Celebrities', '[19] Animals', '[20] Vehicles', '[21] Entertainment: Comics', '[22] Science: Gadgets', '[23] Entertainment: Japanese Anime & Manga', '[24] Entertainment: Cartoon & Animations'
    ]
    const difficulties = ['[0] Any', '[1] Easy', '[2] Medium', '[3] Hard']
    const gameTypes = ['[0] Any', '[1] Multiple Choice', '[2] True / False']

    const updateSettings = (e) => {
        console.log(e.target.value)
        // numQuestions
        if (e.target.name === 'numQuestions') {
            // TODO: account for blanks and other bad characters
            setNumQuestions(e.target.value)
        }
        // categories
        else if (e.target.name === 'categories') {
            setCategory(Number(e.target.value) + 8)
            if (category > 32 || category <= 7) {
                // ERROR!
            }
        }
        // difficulties
        else if (e.target.name === 'difficulties') {
            let diff = Number(e.target.value)
            switch (diff) {
                case 0:
                    setDifficulty('any')
                    break
                case 1:
                    setDifficulty('easy')
                    console.log('easy mode?')
                    break
                case 2:
                    setDifficulty('medium')
                    break
                case 3:
                    setDifficulty('hard')
                    break
                default:
                    // NO MATCH, ERROR? 
                    setDifficulty('any')
            }
        }
        // gameTypes
        else if (e.target.name === 'gameTypes') {
            let cat = Number(e.target.value)
            switch (cat) {
                case 0:
                    setType('any')
                    break
                case 1:
                    setType('multiple')
                    break
                case 2:
                    setType('boolean')
                    break
                default: 
                    setType('any')
            }
        }
    }

    // pass up the URL to the App component when the button is clicked
    const makeURL = () => {
        let url = 'https://opentdb.com/api.php?'
        url += `&amount=${numQuestions}`
        url += category !== 'any' && category !== 8 ? `&category=${category}` : ''
        url += difficulty !== 'any' ? `&difficulty=${difficulty}` : ''
        url += type !== 'any' ? `&type=${type}` : ''
        props.getQuestions(url)
    }

    return (
        <div className="Startup">
            <h1>Trivia App</h1>
            <label>Number of Questions: </label>
            <input type="text" onChange={updateSettings} name="numQuestions" value={numQuestions}></input>
            <br />
            <label>Category: </label>
            <select onChange={updateSettings} name="categories" value={String(category - 8)}>
                { categories.map((cat, index) => <option key={index} value={index}>{cat}</option>) }
            </select>
            <br />
            <label>Difficulty: </label>
            <select onChange={updateSettings}  name="difficulties">
                { difficulties.map((difficulty, index) => <option key={index} value={index}>{difficulty}</option>) }
            </select>
            <br />
            <label>Game types: </label>
            <select onChange={updateSettings} name="gameTypes">
                { gameTypes.map((type, index) => <option key={index} value={index}>{type}</option>) }
            </select>
            <br />
            <button onClick={() => { makeURL(); }}>Start</button>
        </div>
    )
}

export default Startup