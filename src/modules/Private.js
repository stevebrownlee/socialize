const Private = Object.create(null, {
    init: {
        value: () => {
            const _private = new WeakMap()

            return function (object) {
                return _private.has(object)
                    ? _private.get(object)
                    : _private.set(object, Object.create(null))
            }
        }
    }
})

export default Private