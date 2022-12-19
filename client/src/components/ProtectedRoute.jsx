import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../store/authSlice'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ children, redirect }) => {
    const location = useLocation()
    const isLoggedIn = useSelector(getIsLoggedIn())
    if (!isLoggedIn) return <Navigate to={redirect} state={{ referrer: location }}/>
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    redirect: PropTypes.string
}

export default ProtectedRoute
