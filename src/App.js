import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import NavBar from "./nav/NavBar"
import { Link, Switch, Route } from 'react-router';
import Profile from "./user/Profile";
import SearchResults from "./search/SearchResults";
import Home from "./newsfeed/Home";


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentView: "login",
            viewProps: {
                notifications: [],
                activeUser: localStorage.getItem("yakId")
            }
        }
    }


    render() {
        return (
            <React.Fragment>
                <NavBar {...this.state.viewProps}
                    searchHandler={this.performSearch}
                />

                <Switch>
                    <Route component={Profile} pattern="/profile/:id" />
                    <Route exactly component={SearchResults} pattern="/results" />
                    <Route exactly component={Home} pattern="/" />
                </Switch>
            </React.Fragment>
        )
    }
}

export default App
