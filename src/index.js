import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import SearchResults from './search/SearchResults';
import Profile from './user/Profile';
import Home from './newsfeed/Home';
import NavBar from './nav/NavBar';


ReactDOM.render((
    <Router>
        <React.Fragment>
            <NavBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/results" component={SearchResults} />
        </React.Fragment>
    </Router>
), document.querySelector("#root"))


registerServiceWorker();
