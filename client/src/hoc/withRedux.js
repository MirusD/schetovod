import React from 'react'
import { createStore } from '../store/createStore'
import { Provider } from 'react-redux'
const store = createStore()

const withRedux = (Component) => function func({ ...props }) {
            return (
                <Provider store={store}>
                    <Component {...props} />
                </Provider>
            )
        }

export default withRedux
