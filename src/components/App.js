import { ThemeProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateUser from './CreateUser';
import Login from './Login';
import History from './History';
import Transfer from './Transfer';
import Footer from './ui/Footer';
import Header from './ui/Header';
import theme from "./ui/Theme";
import Users from './Users';
// import './ui/App.css'
import './ui/History.css'
import LandingPage from './LandingPage';
import { AuthContext } from "./Context";

function App() {

  const [jwt, setJwt] = useState('')
  const [username, setUsername] = useState('')
  const [role,setRole] = useState('')

  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <AuthContext.Provider value={{
      jwt,
      setJwt,
      username,
      setUsername,
      role,
      setRole
    }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          <Switch>
            <Route exact path='/'
              render={(props) => (
                <LandingPage
                  {...props}
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            />
            <Route exact path='/users'
              render={(props) => (
                <Users
                  {...props}
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            />
            <Route exact path='/history' component={History} />
            <Route exact path='/transfer' component={Transfer} />
            <Route exact path='/login' component={Login} />
            {/* <Route exact path='/login' component={Login} /> */}
            {
                jwt === '' ?
                <Route exact path='/create' component={CreateUser} /> : <Route/>
            }
            {/* <Route exact path='/about' component={AboutUs} /> */}

          </Switch>
          {/*
         
         
          
          <Route exact path='/about' component={AboutUs} /> */}
          <Footer value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </BrowserRouter>

      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
