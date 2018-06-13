import auth0 from 'auth0-js'
import Settings from "../Settings"


export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: "bagoloot.auth0.com",
        clientID: "RUe9qoLtI2fOjc21FpE460NThgWKUKST",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://bagoloot.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid profile"
    })

    login = () => {
        this.auth0.authorize()
    }

    handleAuthentication = (props) => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult, props)
                props.history.push("/")
            } else if (err) {
                props.history.push("/")
                console.log(err)
                alert(`Error: ${err.error}. Check the console for further details.`)
            }
        })
    }

    setSession = (authResult, props) => {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('expires_at', expiresAt)
        // navigate to the default route
        props.history.push("/")
    }

    logout = (props) => {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
    }

    isAuthenticated = () => {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
        return new Date().getTime() < expiresAt
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token')
        if (!accessToken) {
            throw new Error('No Access Token found')
        }
        return accessToken
    }

    getProfile = () => {
        return new Promise((resolve, reject) => {
            // Check if the user's Yak API id is set in local storage
            const yakId = localStorage.getItem("yakId")

            // If it's set, resolve with the API id
            if (yakId !== null) {
                resolve(yakId)

            /*
                Use the Auth0 userInfo() method to request the user's social
                OpenId profile
            */
            } else {
                const accessToken = this.getAccessToken()
                this.auth0.client.userInfo(accessToken, (err, profile) => {
                    if (err) {
                        reject(err)
                    }

                    /*
                        If the user's OpenId profile was successfully retrieved,
                        create an entry in the Yak API user table and resolve
                        with the new id
                    */
                    if (profile) {

                        /*
                            Check if the user already has a profile in the Yak API
                        */
                        fetch(`${Settings.remoteURL}/users?sub=${profile.sub}`)
                            .then(u => u.json())
                            .then(users => {

                                // User already has profile in API, resolve with the id
                                if (users.length) {
                                    resolve(users[0].id)

                                // User not in API, so POST new profile
                                } else {
                                    fetch(`${Settings.remoteURL}/users`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(profile)
                                    })
                                        .then(user => user.json())
                                        .then(user => {
                                            // Put new user's id in localStorage
                                            localStorage.setItem("yakId", user.id)

                                            // Resolve the promise with the new id
                                            resolve(user.id)
                                        })
                                }
                            })
                    }
                })
            }
        })
    }
}
