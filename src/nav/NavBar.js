import React, { Component } from "react"
import { Link } from "react-router-dom"
import Search from "../search/Search"
import yak from "../images/yak.png"
import $ from "jquery"
import "./NavBar.css"


export default class NavBar extends Component {

    // Set initial state
    state = {
        searchTerms: ""
    }

    /**
     * Local search handler, which invokes the searchHandler reference
     * passed from App
     */
    search = (e) => {
        if (e.charCode === 13) {
            Search.getResults(this.state.searchTerms)
            .then(foundItems => {
                    this.setState({ searchTerms: "" })
                    this.props.history.push({
                        pathname: "/results",
                        state: foundItems
                    })
                })

        }
    }

    LoginLogout = () => {
        if (localStorage.getItem("id_token") === null) {
            return <span></span>
        } else {
            return <Link className="nav-link" to="/logout">Logout</Link>

        }
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" onClick={this.props.showView} href="#">
                    <img id="nav__home" src={yak} style={{ height: `50px` }} />
                </a>
                <input id="searchTerms"
                    value={this.state.searchTerms}
                    onChange={this.handleFieldChange}
                    onKeyPress={this.search}
                    className="form-control w-100"
                    type="search"
                    placeholder="Search"
                    aria-label="Search" />
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a href="#" className="notif" id="nav__profile" onClick={()=>$(".profileMenu").slideToggle(333)}>
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <this.LoginLogout />
                    </li>
                </ul>
            </nav>
        )
    }
}
