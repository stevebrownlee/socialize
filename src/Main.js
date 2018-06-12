import { Switch, Route } from 'react-router-dom'
import React, { Component } from "react"
import Profile from './user/Profile';
import SearchResults from './search/SearchResults';
import LoginPrompt from './auth/LoginPrompt';
import Logout from './auth/Logout';
import Home from './newsfeed/Home';


export default () => (
    <main>
            <Route exact path="/" component={Home} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/results" component={SearchResults} />
            <Route path="/login" component={LoginPrompt} />
            <Route path="/logout" component={Logout} />
    </main>
)
