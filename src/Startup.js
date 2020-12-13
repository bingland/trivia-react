import React, { useState, useContext } from 'react'
import SelectForm from './components/SelectForm'
import InputForm from './components/InputForm'
import { LoginContext } from './context/login-context'
import {
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
  

const Startup = (props) => {
    const loginContext = useContext(LoginContext)
    const history = useHistory()
    // console.log(loginContext.globalUsername)
    // loginContext.login()
    // console.log(loginContext.isLoggedIn)

    // https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple
    const [numQuestions, setNumQuestions] = useState(10); //removed from user settings
    const [category, setCategory] = useState('any');
    const [difficulty, setDifficulty] = useState('any');
    const [type, setType] = useState('any');
    const [username, setUsername] = useState(loginContext.globalUsername)
    const [passcode, setPasscode] = useState('')
    const [confirmPasscode, setConfirmPasscode] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const categories = [
        'Any', 'General Knowledge', 'Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music', 'Entertainment: Musicals & Theatres', 'Entertainment: Television', 'Entertainment: Video Games', 'Entertainment: Board Games', 'Science & Nature', 'Science: Computers', 'Science: Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Entertainment: Comics', 'Science: Gadgets', 'Entertainment: Japanese Anime & Manga', 'Entertainment: Cartoon & Animations'
    ]
    const difficulties = ['Any', 'Easy', 'Medium', 'Hard']
    const gameTypes = ['Any', 'Multiple Choice', 'True / False']

    const updateSettings = (e) => {
        setErrorMessage('')
        // username
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        }
        // passcode
        if (e.target.name === 'passcode') {
            setPasscode(e.target.value)
        }
        // confirmPasscode
        if (e.target.name === 'confirmPasscode') {
            setConfirmPasscode(e.target.value)
        }
        // email
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
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

    // pass up the URL to the App component when the Button is clicked
    const makeURL = () => {
        let url = 'https://opentdb.com/api.php?'
        url += `&amount=${numQuestions}`
        url += category !== 'any' && category !== 8 ? `&category=${category}` : ''
        url += difficulty !== 'any' ? `&difficulty=${difficulty}` : ''
        url += type !== 'any' ? `&type=${type}` : ''
        if (username && username.replace(/\s/g, '') !== '') {
            props.getQuestions(url)
        }
    }

    const preventDefault = (e) => {
        e.preventDefault()
    }

    const resetFields = () => {
        setNumQuestions(10)
        setCategory('any')
        setDifficulty('any')
        setType('any')
        setUsername('')
        setPasscode('')
        setConfirmPasscode('')
        setEmail('')
        setErrorMessage('')
    }

    const login = () => {
        if(username.replace(/\s/g, '') !== '' && passcode.replace(/\s/g, '')) {
            history.push('/')
            loginContext.login(username)
        }
    }

    const logout = () => {
        loginContext.logout()
    }

    const createAccount = () => {
        if ((passcode === confirmPasscode) && username.replace(/\s/g, '') !== '' && passcode.replace(/\s/g, '') && confirmPasscode.replace(/\s/g, '') !== '' && email.replace(/\s/g, '')) {
            history.push('/')
            loginContext.login(username)
        } else if (passcode !== confirmPasscode) {
            setErrorMessage('Passcodes do not match.')
        } else if (passcode.length < 8) {
            setErrorMessage('Passcode must be at least 8 characters long.')
        }
    }



    return (
        <div className="Startup">
            <h1>Trivia App</h1>
            
            <Switch>
            <Route path="/" exact>
                { (loginContext.isLoggedIn === false) && (
                    <Link to="/login"><button onClick={resetFields} className="loginBtn">Log in</button></Link>
                )}
                { (loginContext.isLoggedIn === true) && (
                    <button onClick={() => {resetFields(); logout()}} className="loginBtn">Log Out</button>
                )}
                <form className="inputs" onSubmit={preventDefault}>
                    <div className="inputArea">
                        <InputForm 
                            change={updateSettings} 
                            name="username"
                            type="text"
                            place="Username" 
                            required="required"
                            value={username !== null ? username : ''}
                            disabled={ loginContext.globalUsername === '' || loginContext.globalUsername === null ? false : true } />
                    </div>
                    
                    
                    <div className="inputArea">
                        <SelectForm
                            change={updateSettings} 
                            name="categories" 
                            items={categories}
                            place="Category" />
                    </div>
                    
                    <div className="inputArea">
                        <SelectForm
                            change={updateSettings} 
                            name="difficulties" 
                            items={difficulties}
                            place="Difficulty" />
                    </div>
                    
                    <div className="inputArea">
                        <SelectForm
                            change={updateSettings} 
                            name="gameTypes" 
                            items={gameTypes}
                            place="Game Type" />
                    </div>
                    <button type="submit" className="startBtn" onClick={() => { makeURL(); loginContext.setGlobalUsername(username) }}>Start Game</button>
                </form>
            </Route>

            <Route path="/login">
                <Link to="/">
                    <button onClick={resetFields} className="backBtn">
                            <svg viewBox='0 0 512 512'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M328 112L184 256l144 144'/></svg>
                    </button>
                </Link>
            
                <form className="inputs" onSubmit={preventDefault}>
                    <div className="inputArea">
                        <InputForm 
                            change={updateSettings}
                            name="username"
                            place="Username" 
                            type="text"
                            required="required" />
                    </div>
                    <div className="inputArea">
                        <InputForm 
                            change={updateSettings} 
                            name="passcode"
                            place="Passcode" 
                            type="password"
                            required="required" />
                    </div>
                    <button type="submit" className="startBtn" onClick={ login }>Log In</button>
                    <h2 className="loginType" onClick={resetFields}><Link to="signup">Create an Account</Link></h2>
                </form>
            
            </Route>

            <Route path="/signup">
                <button onClick={resetFields} className="backBtn">
                    <Link to="/">
                        <svg viewBox='0 0 512 512'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M328 112L184 256l144 144'/></svg>
                    </Link>
                </button>

                <form className="inputs" onSubmit={preventDefault}>
                    <div className="inputArea">
                        <InputForm 
                            change={updateSettings} 
                            name="username"
                            place="Username" 
                            type="text"
                            required="required" />
                    </div>
                    <div className="inputArea">
                        <InputForm 
                            change={updateSettings} 
                            name="email"
                            place="Email" 
                            type="email"
                            required="required" />
                    </div>
                    <div className="inputArea">
                        <InputForm 
                            change={updateSettings} 
                            name="passcode"
                            place="Passcode" 
                            type="password"
                            required="required" />
                    </div>
                    <div className="inputArea">
                        <InputForm 
                            change={updateSettings} 
                            name="confirmPasscode"
                            place="Confirm Passcode" 
                            type="password"
                            required="required" />
                    </div>
                    { errorMessage !== '' && (
                        <h2 className="errorMessage">{errorMessage}</h2>
                    )}
                    <button type="submit" className="startBtn" onClick={ createAccount }>Create Account</button>
                    <h2 className="loginType" onClick={resetFields}><Link to="/">Log in</Link></h2>
                </form>
            </Route>
            </Switch>
        </div>
    )
}

export default Startup