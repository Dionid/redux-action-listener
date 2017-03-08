/**
 * Created by dionid on 08.03.17.
 */
import React from 'react'

const actionListener = (() => {
    const _actionListeners = {}

    const actionListener = store => next => ({type, ...rest}) => {
        _actionListeners[type] && _actionListeners[type].forEach(lst => lst(rest))
        next({type, ...rest})
    }

    function addActionListener(type, fn) {
        if (_actionListeners[type]) {
            _actionListeners[type] = _actionListeners[type].filter(f => f !== fn).push(fn)
        } else {
            _actionListeners[type] = [fn]
        }
        return () => {
            _actionListeners[type] = _actionListeners[type].filter(f => f !== fn)
        }
    }

    return {
        middleware: actionListener,
        addActionListener,
    }
})()

export default actionListener.middleware
const addActionListener = actionListener.addActionListener

function listenActions(Component) {
    class ListenerComponent extends React.Component {

        unSub = []

        componentWillUnmount() {
            this.unSub.forEach(fn => fn())
        }

        addActionListeners = (listeners) => {
            this.unSub = Object.keys(listeners).reduce((arr, listenerName) => {
                return [
                    ...arr,
                    addActionListener(listenerName, listeners[listenerName]),
                ]
            }, [])
        }

        render() {
            return <Component addActionListeners={ this.addActionListeners } { ...this.props }/>
        }
    }

    return ListenerComponent
}

export {
    addActionListener,
    listenActions
}