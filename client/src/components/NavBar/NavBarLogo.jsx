import React from "react"
import { NavLink } from "react-router-dom";

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

export default NavBarLogo
