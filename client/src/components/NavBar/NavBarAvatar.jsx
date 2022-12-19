import React from 'react'
import PropTypes from 'prop-types'

const NavBarAvatar = ({ src }) => {
    return (
        <img
            src={src}
            className='inline-block h-7 rounded-full pr-2 w-auto'
            alt='avatar'
        />
    )
}

NavBarAvatar.propTypes = {
    src: PropTypes.string
}

export default NavBarAvatar
