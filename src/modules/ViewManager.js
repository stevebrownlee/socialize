const ViewManager = Object.create(null, {
    init: {
        value: function (selector, eventName, fn) {
            this.eventName = eventName
            this.selector = eventName
            this.element = document.querySelector(selector)

            this.element.addEventListener(eventName, fn)
        }
    },
    broadcast: {
        value: function (view, payload) {
            this.element.dispatchEvent(new CustomEvent(this.eventName, {
                    detail: {
                        view: view,
                        payload: payload
                    }
                }))
        }
    }
})

export default ViewManager
