import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import "./index.css"

ReactDOM.render((
    <Router>
        <App />
    </Router>
), document.querySelector("#root"))


registerServiceWorker()
