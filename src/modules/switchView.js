const ViewManager = Object.create(null, {
    init: {
        value: function (selector, eventName) {
            this.eventName = eventName
            this.selector = eventName
            this.element = document.querySelector(selector)

            this.element.addEventListener(eventName, this.broadcast)
        }
    },
    broadcast: {
        value: (view, payload) => {
            this.element.dispatchEvent(new CustomEvent(eventName, {
                    detail: {
                        view: view,
                        payload: payload
                    }
                }))
        }
    }
})

export default ViewManager


export default (view, payload) => {
    document.querySelector("#root")
        .dispatchEvent(new CustomEvent("changeView", {
            detail: {
                view: view,
                payload: payload
            }
        }))
}