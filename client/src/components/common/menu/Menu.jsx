import React, {useState, useEffect, useContext, useRef} from "react"
import {twMerge} from "tailwind-merge";

const MenuContext = React.createContext()

const useStateMenu = () => {
    return useContext(MenuContext)
}

const MenuProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const openMenu = () => setOpen(true)
    const closeMenu = () => setOpen(false)
    const getStateMenu = () => open

    return (
        <MenuContext.Provider value={{ openMenu, closeMenu, getStateMenu }}>
            { children }
        </MenuContext.Provider>
    )
}

const Menu = ({className, children }) => {
    const { openMenu, closeMenu, getStateMenu } = useStateMenu()
    const menu = useRef(null)

    useEffect(() => {
        const bodyClickHandler = (e) => {
            e.stopPropagation()
            const { target } = e
            let its_menu = target === menu.current || menu.current.contains(target)
            if (!its_menu) closeMenu()
        }
        document.addEventListener('click', bodyClickHandler)
        return () => document.removeEventListener('click', bodyClickHandler)
    }, [])

    return (
            <div
                ref={menu}
                className={twMerge(className, "relative")}
                onClick={() => getStateMenu() ? closeMenu() : openMenu()} >
                { children }
            </div>
    )
}

const MenuContainer = (props) => {

    return (
        <MenuProvider>
            <Menu {...props} />
        </MenuProvider>
    )
}

const Button = ({ children }) => {
    return (
        <button className="px-4 py-2 text-slate-500 hover:text-green-500 duration-200">{ children }</button>
    )
}

const Items = ({ children }) => {
    const { getStateMenu } = useStateMenu()
    const menuState = getStateMenu()

    return (
        <>
            { menuState && (
                <ul className="origin-top-right absolute right-0 top-8 mt-2 w-56 rounded-md shadow-lg bg-white/40 ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100">
                    { children }
                </ul>
            )
            }
        </>
    )
}

const Item = ({ children, ...rest }) => {
    return (
        <>
            <li
                {...rest}
                className="text-gray-700 block px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-green-100/40 cursor-pointer"
            >
                { children }
            </li>
        </>
    )
}

MenuContainer.Item = Item
MenuContainer.Button = Button
MenuContainer.Items = Items
export default MenuContainer
