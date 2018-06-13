import React, { Component } from "react"
import { Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import NavBar from "./nav/NavBar"
import Main from "./Main";


export default class App extends Component {
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
                <Route render={history => (
                    <NavBar { ...history } />
                )} />
                <Route render={history => (
                    <Main { ...history } />
                )} />

            </React.Fragment>
        )
    }
}
