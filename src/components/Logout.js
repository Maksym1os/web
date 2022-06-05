import React, { useContext } from 'react';
import { AuthContext } from './Context'
import LandingPage from './LandingPage';
import { Redirect } from 'react-router-dom';

export default function Logout() {

    const { setJwt, setUsername } = useContext(AuthContext)

    setJwt('')
    setUsername('')

    return (
        <Redirect exact path='/' component={LandingPage} />
    )
}
