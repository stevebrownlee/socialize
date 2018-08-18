import React, { Component } from "react"
import Search from "../search/Search"
import ViewManager from "../modules/ViewManager"
import $ from "jquery"

import yak from "../images/yak.png"
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
                    ViewManager.broadcast("results", foundItems)
                })

        }
    }

    LoginLogout = () => {
        if (this.props.activeUser === null) {
            return <a className="nav-link"
                onClick={() => ViewManager.broadcast("login")} href="#">Login</a>
        } else {
            return <a className="nav-link"
                onClick={() => ViewManager.broadcast("logout", { activeUser: null, notifications: [] })} href="#">Logout</a>
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
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" onClick={() => ViewManager.broadcast("home")} href="#">
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
                            <span className="num">{this.props.notifications.length}</span>
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <this.LoginLogout />
                    </li>
                </ul>
                <article className="profileMenu">
                    <section className="profileMenu__item">
                        {
                            this.props.notifications.map((n, idx) =>
                                <div key={idx}><a title="notifications" id="nav__notifications" href="#">{n}</a></div>)
                        }
                    </section>
                </article>
            </nav>
        )
    }
}
