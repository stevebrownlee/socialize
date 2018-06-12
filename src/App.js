import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import NavBar from "./nav/NavBar"
import Main from "./Main";


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

                <Main />
            </React.Fragment>
        )
    }
}

export default App
