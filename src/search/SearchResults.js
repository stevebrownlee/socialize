// COMPONENTS
import React, { Component } from "react"
import ViewManager from "../modules/ViewManager"

// IMAGES
import Avatar from "../images/avatar.png"

// STYLES
import "./SearchResults.css"
import "../newsfeed/Post.css"


export default (props) => (
    <div className="searchResults">
        <h1>Search Results</h1>
        {
            props.foundItems.posts.map(p =>
                <div className="card post" key={p.id}>
                    <div className="card-body">
                        <h5 className="card-title">By {p.user.name}</h5>
                        <p className="card-text">
                            {p.message}
                        </p>
                        <a href="#" className="btn btn-outline-success">Like</a>
                    </div>
                </div>
            )
        }

        {
            props.foundItems.users.map(u =>
                <div className="card post" key={u.id}>
                    <img className="card-img-top avatar" src={Avatar} alt="Generic person image" />
                    <div className="card-body">
                        <h5 className="card-title">{u.name}</h5>
                        <a href="#"
                            className="btn btn-outline-success"
                            onClick={() => ViewManager.broadcast("profile", {userId: u.id})}
                            >View profile</a>
                    </div>
                </div>
            )
        }
    </div>
)