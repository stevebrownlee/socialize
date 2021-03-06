import React, { Component } from "react"
import "./Post.css"

/**
 * TODOs:
 *     - Only show the Like button if it's another user's post
 *     - Instead of user email, show user's first and last name
 */
export default class Post extends Component {
    render() {
        return (
            <div className="card post">
                <div className="card-body">
                    <h5 className="card-title">By {this.props.post.user.email}</h5>
                    <p className="card-text">
                        {this.props.post.message}
                    </p>
                    <a href="#" className="btn btn-outline-success">Like</a>
                </div>
            </div>
        )
    }
}
