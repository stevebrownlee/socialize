import React, { Component } from "react"
import "./FriendList.css"
import Settings from "../Settings"


export default class FriendList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            friends: [],
            activeUser: localStorage.getItem("yakId")
        }
    }


    showProfile = id => {
        this.props.history.push({
            pathname: `/profile/${id}`,
            state: {
                isFriend: true
            }
        })
    }

    componentDidMount() {
        let allFriendships = []

        fetch(`${Settings.remoteURL}/friends?acceptedFriendId=${this.state.activeUser}&pending=false`)
            .then(r => r.json())
            .then(relationships => {
                allFriendships = allFriendships.concat(relationships.map(r => r.requestingFriendId))
                return fetch(`${Settings.remoteURL}/friends?requestingFriendId=${this.state.activeUser}&pending=false`)
            })
            .then(r => r.json())
            .then(relationships => {
                if (relationships.length) {
                    /*
                        allFriendships gets concat run with the new array, then only unique values
                        are extracted, converted from Map to an array, then put in URL query string
                        format, and joined together with &
                    */
                    const uniqueFriends = new Set(allFriendships.concat(relationships.map(r => r.acceptedFriendId)))
                    allFriendships = [...uniqueFriends].map(id => `id=${id}`).join("&")

                    // Query users table for all matching friends
                    fetch(`${Settings.remoteURL}/users?${allFriendships}`)
                        .then(r => r.json())
                        .then(users => {
                            this.setState({ friends: users })
                        })
                }
            })
    }

    render() {
        return (
            <div className="friendList">
               <h5 className="sideHeader">Friends</h5>
                {
                    this.state.friends.map(u =>
                        <div className="card" key={u.id}>
                            <img className="card-img-top avatar" src={u.picture} alt="Generic person image" />
                            <div className="card-body">
                                <a className="card-title friendList__name"
                                   id={`friend--${u.id}`}
                                   onClick={() => this.showProfile(u.id)}
                                   href="#">{u.name}</a>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
