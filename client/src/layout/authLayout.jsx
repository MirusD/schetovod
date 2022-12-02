import React from "react"
import { Outlet } from "react-router-dom"
import Card from "../components/Card"

const AuthLayout = () => {
    return (
        <div className='flex grow flex-col justify-center items-center  dark:text-slate-200 '>
            <Card>
                <Outlet/>
            </Card>
        </div>
    )
}

export default AuthLayout
