import React, { useState } from 'react'

export const LoginContext = React.createContext({
    isLoggedIn: false,
    username: '',
    login: () => {

    },
    logout: () => {

    }
})

const LoginContextProvider = props => {
    const localStorageLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) === true ? true : false
    const [isLoggedIn, setIsLoggedIn] = useState(localStorageLoggedIn)
    const localStorageGlobalUsername = localStorage.getItem('username') !== '' ? localStorage.getItem('username') : ''
    console.log(localStorageGlobalUsername)
    const [globalUsername, setGlobaluserName] = useState(localStorageGlobalUsername)

    const loginHandler = (name) => {
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('username', name)
        setGlobaluserName(name)
        setIsLoggedIn(true)
    }

    const logoutHandler = () => {
        localStorage.setItem('isLoggedIn', false)
        localStorage.setItem('username', '')
        console.log(localStorage.getItem('isLoggedIn'))
        setGlobaluserName('')
        setIsLoggedIn(false)
    }

    return (
        <LoginContext.Provider value={{login: loginHandler, logout: logoutHandler, isLoggedIn: isLoggedIn, globalUsername: globalUsername}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider