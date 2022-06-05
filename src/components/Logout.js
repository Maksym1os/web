import React, { useContext } from 'react';
import { AuthContext } from './Context'
import LandingPage from './LandingPage';
import { Redirect } from 'react-router-dom';

export default function Logout() {

    const { setJwt, setUsername, setRole } = useContext(AuthContext)

    setJwt('')
    setUsername('')
    setRole('')

    return (
        <Redirect exact path='/' component={LandingPage} />
    )
}
