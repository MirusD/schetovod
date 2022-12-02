import React from "react"

const NavBarAvatar = ({src}) => {
    return (
        <img
            src={src}
            className='inline-block h-7 rounded-full pr-2 w-auto'
            alt='avatar'
        />
    )
}

export default NavBarAvatar
