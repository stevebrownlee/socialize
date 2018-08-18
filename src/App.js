import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import Home from "./newsfeed/Home"
import SearchResults from "./search/SearchResults"
import Profile from "./user/Profile"
import Auth from "./auth/Auth.js"
import Notifications from "./user/Notifications"
import Logout from "./auth/Logout"
import LoginPrompt from "./auth/LoginPrompt"
import ViewManager from "./modules/ViewManager"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import "./App.css"

class App extends Component {
    constructor(props) {
        super(props)

        // Initial new object for Auth0 authentication
        this.auth = new Auth()

        // Initialize ViewManager for switching main view
        ViewManager.init("#root", "changeView", this.switch)

        // Set initial state
        this.state = {
            currentView: "login",
            viewProps: {
                notifications: [],
                activeUser: localStorage.getItem("yakId")
            }
        }
    }

    switch = event => {
        const activeUser = this.state.viewProps.activeUser

        // Retrieve any notifications for the navbar, then switch the view
        Notifications.load(activeUser).then(notes => {
            const _viewProps = Object.assign({
                notifications: notes,
                activeUser: activeUser
            }, event.detail.payload)

            // Update state to trigger the view change
            this.setState({
                currentView: event.detail.view,
                viewProps: _viewProps
            })
        })
    }


    componentDidMount() {
        // Do I have an active user?
        if (this.state.viewProps.activeUser === null) {

            // Check if user currently authenticated, or have redirected from Auth0 login
            this.auth.checkAuthentication().then(authenticated => {
                if (authenticated) {
                    // Authentication via Auth0 succeeded, now get user's social profile
                    this.auth.getProfile().then(id => {

                        // Got profile and POSTed to API, store API id
                        localStorage.setItem("yakId", id)

                        Notifications.load(id).then(notes => {
                            ViewManager.broadcast("home", { notifications: notes, activeUser: id })
                        })
                    })
                } else {
                    ViewManager.broadcast("validationFailed")
                }
            })

        // activeUser loaded from localStorage. Get notifications for user.
        } else {
            Notifications.load(this.state.viewProps.activeUser).then(notes => {
                ViewManager.broadcast("home", { notifications: notes })
            })
        }
    }


    View = () => {
        /*
            If no localStorage yakId, then user is unauthenticated. Show basic
            login message and `componentDidMount` with handle authenticating the
            user via Auth0
        */
        if (localStorage.getItem("yakId") === null) {
            return <h2 style={{marginTop: `125px`}}>Please log in first</h2>
        }

        /*
            User is authenticated, so load the view specified
        */
        switch (this.state.currentView) {
            case "login":
                return <LoginPrompt />
            case "profile":
                return <Profile {...this.state.viewProps} />
            case "logout":
                this.auth.logout()
                return <Logout />
            case "results":
                return <SearchResults {...this.state.viewProps} />
            case "home":
            default:
                return <Home {...this.state.viewProps} />
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBar {...this.state.viewProps} />

                {this.View()}
            </React.Fragment>
        )
    }
}

export default App
