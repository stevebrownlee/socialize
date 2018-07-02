import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Profile from "./user/Profile"
import SearchResults from "./search/SearchResults"
import Login from "./auth/Login"
import Auth from "./auth/Auth"
import Home from "./newsfeed/Home"
import Callback from "./Callback/Callback"


export default class Main extends Component {
    constructor(props) {
        super(props)
        this.auth = new Auth()
    }

    handleAuthentication = (props) => {
        if (/access_token|id_token|error/.test(props.location.hash)) {
            this.auth.handleAuthentication(props)
                .then(() => {
                    return this.auth.getProfile()
                })
                .then(id => {
                    this.props.history.push("/")
                })
                .catch(err => console.error(err))
        }
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) =>
                    this.auth.isAuthenticated() ? <Home auth={this.auth} {...props} /> : <Redirect to="/login" />}
                    />
                <Route path="/profile/:profileId" render={(props) =>
                    this.auth.isAuthenticated() ? <Profile auth={this.auth} {...props} /> : <Redirect to="/login" />}
                    />
                <Route path="/results" render={(props) => {
                    if (this.auth.isAuthenticated()) {
                        return <SearchResults auth={this.auth} {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/callback" render={(props) => {
                    this.handleAuthentication(props)
                    return <Callback {...props} />
                }} />
                <Route path="/logout" render={(props) => {
                    this.auth.logout()
                    return <Redirect to="/login" />
                }} />
                <Route path="/login" render={(props) => <Login auth={this.auth} {...props} />} />
            </React.Fragment>
        )
    }
}
