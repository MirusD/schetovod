import React from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import PropTypes from 'prop-types'

const StyledNavLink = ({ children, styleType = 'default', className, ...rest }) => {
    function getLinkStyle(style) {
        switch (style) {
            case 'button':
                return 'rounded-lg shadow-sm px-4 py-2 ring-1 ring-slate-900/10 hover:text-green-500  hover:ring-green-500 transition-all duration-200'
            case 'underline':
                return 'inline-block text-indigo-500 text-sm duration-200 transition-all after:content-[""] after:w-0 after:h-[.05rem] after:block after:bg-indigo-500 after:transition-all after:duration-200 hover:after:w-full'
            case 'withIcon':
                return 'group flex font-semibold text-sm leading-6 text-slate-600 hover:text-slate-400 trans transition-all duration-200'
            default:
                return 'hover:text-green-500 transition-colors duration-200 px-4 py-2 text-slate-500'
        }
    }

    return (
        <NavLink
            className={({ isActive }) =>
                twMerge(
                    className || '',
                    getLinkStyle(styleType),
                    styleType === 'default' && isActive && 'text-green-500'
                )
            }
            {...rest}
        >
            {children}
        </NavLink>
    )
}

StyledNavLink.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    styleType: PropTypes.string,
    className: PropTypes.string
}

export default StyledNavLink
