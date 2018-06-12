import { Switch, Route } from 'react-router-dom'
import React, { Component } from "react"
import Profile from './user/Profile';
import SearchResults from './search/SearchResults';
import LoginPrompt from './auth/LoginPrompt';
import Home from './newsfeed/Home';


export default () => (
    <main>
        <Switch>
            <Route path="/" component={Home} />
            <Route exact path="profile/:id" component={Profile} />
            <Route exact path="results" component={SearchResults} />
            <Route path="/login" component={LoginPrompt} />
        </Switch>
    </main>
)
