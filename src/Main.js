import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Profile from './user/Profile';
import SearchResults from './search/SearchResults';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Auth from './auth/Auth';
import Home from './newsfeed/Home';
import Callback from './Callback/Callback';


export default class Main extends Component {
    constructor(props) {
        super(props)
        this.auth = new Auth()
    }

    handleAuthentication = (props) => {
        console.log(props);

        if (/access_token|id_token|error/.test(props.location.hash)) {
            this.auth.handleAuthentication(props);
        }
    }

    render() {
        return (
            <main>
                <Route exact path="/" render={(props) =>
                    this.auth.isAuthenticated() ? <Home auth={this.auth} {...props} /> : <Redirect to="/login" />}
                />
                <Route path="/profile/:id" render={(props) =>
                    this.auth.isAuthenticated() ? <Profile auth={this.auth} {...props} /> : <Redirect to="/login" />}
                />
                <Route path="/results" render={(props) =>
                    this.auth.isAuthenticated() ? <SearchResults auth={this.auth} {...props} /> : <Redirect to="/login" />} />
                <Route path="/callback" render={(props) => {
                    this.handleAuthentication(props);
                    return <Callback {...props} />
                }} />
                <Route path="/logout" render={(props) => {
                    this.auth.logout()
                    return <Redirect to="/login" />
                }} />
            <Route path="/login" render={(props) => <Login auth={this.auth} {...props} />} />
            </main>
        )
    }
}
