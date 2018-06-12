import Settings from "../Settings"


export default Object.create(null, {
    load: {
        value: id => {
            // Any pending friend requests
            return fetch(`${Settings.remoteURL}/friends?acceptedFriendId=${id}&pending=true`)
                .then(r => r.json())
                .then(relationships => {
                    if (relationships.length) {
                        const allFriendships = relationships.map(r => r.requestingFriendId)
                            .map(id => `id=${id}`)
                            .join("&")

                        // Query users table for all matching friends
                        return fetch(`${Settings.remoteURL}/users?${allFriendships}`)
                            .then(r => r.json())
                            .then(users => {
                                return users.map(u => `${u.name} has sent you a friend request`)
                            })
                    }
                })


            // A friend has sent a private message

            // A friend has created a new event
        }
    }
})
