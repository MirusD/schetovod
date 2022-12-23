import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div
            className="container mx-auto mt-6 mb-4"
        >
            <Outlet/>
        </div>
    )
}

export default DashboardLayout
