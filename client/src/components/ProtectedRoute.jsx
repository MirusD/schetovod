import React from 'react'
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { getIsLoggedIn } from "../store/authSlice"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, redirect }) => {
    const location = useLocation()
    const isLoggedIn = useSelector(getIsLoggedIn())
    if (!isLoggedIn) return <Navigate to={redirect} state={{referrer: location}}/>
    return children
}

export default ProtectedRoute
