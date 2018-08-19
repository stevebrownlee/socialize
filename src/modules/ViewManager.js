import Private from "./Private"

const _private = Private.init()

const ViewManager = Object.create(Private, {
    init: {
        value: function (selector, eventName, fn) {
            _private(this).eventName = eventName
            _private(this).selector = selector
            _private(this).element = document.querySelector(selector)
            _private(this).element.addEventListener(_private(this).eventName, fn)
        }
    },
    broadcast: {
        value: function (view, payload) {
            _private(this).element.dispatchEvent(
                new CustomEvent(_private(this).eventName, {
                    detail: {
                        view: view,
                        payload: payload
                    }
                })
            )
        }
    }
})

export default ViewManager
