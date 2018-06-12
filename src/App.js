import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import NavBar from "./nav/NavBar"
import Home from "./newsfeed/Home"
import Login from "./auth/Login"
import SearchResults from "./search/SearchResults"
import Profile from "./user/Profile"
import Register from "./auth/Register"
import Auth from "./auth/Auth.js"
import Notifications from "./user/Notifications"
import Search from "./search/Search"
import Logout from "./auth/Logout";
import LoginPrompt from "./auth/LoginPrompt";

class App extends Component {
    constructor(props) {
        super(props)

        this.auth = new Auth()

        // Set initial state
        this.state = {
            currentView: "login",
            viewProps: {
                notifications: [],
                activeUser: localStorage.getItem("yakId")
            }
        }
    }

    performSearch = (searchTerms) => Search
                        .getResults(searchTerms)
                        .then(foundItems => this.showView("results", foundItems))

    // View switcher -> passed to NavBar and Login
    // Argument can be an event (via NavBar) or a string (via Login)
    showView = (viewOrEvent, ...props) => {
        const view = viewOrEvent.hasOwnProperty("target") ?
                     viewOrEvent.target.id.split("__")[1] :
                     viewOrEvent

        Notifications.load(this.state.viewProps.activeUser).then(notes => {
            this.setState({
                currentView: view,
                viewProps: Object.assign({
                    showView: this.showView,
                    notifications: notes,
                    activeUser: this.state.viewProps.activeUser
                }, ...props)
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
                            this.showView("home", { notifications: notes, activeUser: id })
                        })
                    })
                } else {
                    this.showView("validationFailed")
                }
            })

        // activeUser loaded from localStorage. Get notifications for user.
        } else {
            Notifications.load(this.state.viewProps.activeUser).then(notes => {
                this.showView("home", { notifications: notes })
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
                <NavBar {...this.state.viewProps}
                    searchHandler={this.performSearch}
                    />

                {this.View()}
            </React.Fragment>
        )
    }
}

export default App
