import React, { useState } from 'react'

export const LoginContext = React.createContext({
    isLoggedIn: false,
    username: '',
    login: () => {},
    logout: () => {},
    setUsername: () => {}
})

const LoginContextProvider = props => {
    const localStorageLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) === true ? true : false
    const [isLoggedIn, setIsLoggedIn] = useState(localStorageLoggedIn)
    const localStorageGlobalUsername = localStorage.getItem('username') !== '' ? localStorage.getItem('username') : ''
    const [globalUsername, setGlobalUsername] = useState(localStorageGlobalUsername)

    const loginHandler = (name) => {
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('username', name)
        setGlobalUsername(name)
        setIsLoggedIn(true)
    }

    const logoutHandler = () => {
        localStorage.setItem('isLoggedIn', false)
        localStorage.setItem('username', '')
        console.log(localStorage.getItem('isLoggedIn'))
        setGlobalUsername('')
        setIsLoggedIn(false)
    }

    return (
        <LoginContext.Provider value={{login: loginHandler, logout: logoutHandler, isLoggedIn: isLoggedIn, globalUsername: globalUsername, setGlobalUsername: setGlobalUsername}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider