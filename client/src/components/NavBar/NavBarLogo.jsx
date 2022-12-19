import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const NavBarLogo = ({ link, src, label }) => {
    return (
        <NavLink to={link} className="flex items-center mr-3">
            <img
                className="h-9 inline-block items-center"
                src={src}
                alt="logo"
            />
            <span className="text-lg text-slate-800 mx-4 font-bold">{label}</span>
        </NavLink>
    )
}

NavBarLogo.propTypes = {
    link: PropTypes.string,
    src: PropTypes.string,
    label: PropTypes.string
}

export default NavBarLogo
