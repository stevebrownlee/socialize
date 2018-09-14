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
            activeUser: localStorage.getItem("yakId")
        }
    }

    setActiveUser = id => {
        (id === null) ? localStorage.removeItem("yakId") : localStorage.setItem("yakId", id)
        this.setState({
            activeUser: id
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route render={props => (
                    <NavBar { ...props } />
                )} />
                <Route render={props => (
                    <Main { ...props } activeUser={this.state.activeUser} />
                )} />

            </React.Fragment>
        )
    }
}
