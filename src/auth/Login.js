import React, { Component } from "react"
import GoogleOAuth from "./sign-in-with-google.png"
import Auth from "./Auth";


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.auth = new Auth()
    }

    handleLogin = () => {
        this.props.auth.login()
    }

    render() {
        return (
            <img src={GoogleOAuth} onClick={this.handleLogin} />
        )
    }
}
