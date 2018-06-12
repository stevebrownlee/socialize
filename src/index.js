import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import "./index.css"
import SearchResults from "./search/SearchResults"
import Profile from "./user/Profile"
import Login from "./auth/LoginPrompt"


ReactDOM.render((
    <Router>
        <App />
    </Router>
), document.querySelector("#root"))


registerServiceWorker()
