import React from 'react'
import logo from '../logo.png'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
    return (
        <div className="bg-gray-50 flex justify-center items-center grow">
            <div
                className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-between flex-col"
            >
                <h1
                    className="font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center mb-4 text-center"
                >
                    <img
                        className="h-20 inline-block items-center"
                        src={logo}
                        alt="logo"
                    />
                    <span className="block text-gray-700">
                        Счетовод
                    </span>
                    <span className="text-green-600">
                        знает где ваши деньги
                    </span>
                </h1>
                <div className="mt-5">
                    <NavLink
                        to="auth/login"
                        className="px-5 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 shadow"
                    >Войти</NavLink>
                </div>
            </div>
        </div>
    )
}

export default HomePage
