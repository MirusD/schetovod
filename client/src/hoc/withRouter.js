import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const withRouter = (Component) => function func({ ...props }) {
            return (
                <BrowserRouter>
                    <Component {...props} />
                </BrowserRouter>
            )
        }

export default withRouter
