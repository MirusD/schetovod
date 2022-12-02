import React from "react"
import { NavLink } from "react-router-dom"
import NavBarLogo from "./NavBarLogo"
import NavBarLinkList from "./NavBarLinkList"
import logo from "../../logo.png"
import userPlaceholder from "../../user-placeholder.png"
import StyledNavLink from "../StyledNavLink"
import {useSelector} from "react-redux";
import {getCurrentUser, getIsLoggedIn} from "../../store/authSlice";
import {twMerge} from "tailwind-merge";
import Menu from "../common/menu/Menu";
import NavBarAvatar from "./NavBarAvatar";
import useLogout from "../../hooks/useLogout";

const NavBar = ({ className }) => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const user = useSelector(getCurrentUser())
    const handleLogout = useLogout()

    return (
        <div className={twMerge("flex items-center justify-between py-4", className)}>
            <NavBarLogo label="Счетовод" src={logo}/>
            <NavBarLinkList>
                <li>
                    <StyledNavLink to="/">
                        Главная
                    </StyledNavLink>
                </li>
                {isLoggedIn && (
                    <>
                    <li>
                        <StyledNavLink to="dashboard/bank-accounts">
                            Финансы
                        </StyledNavLink>
                    </li>
                    </>
                )}
                {isLoggedIn ? (
                    <Menu className="border-l-2">
                        <Menu.Button>
                            <NavBarAvatar src={user.avatar || userPlaceholder}/>
                            {user.name}
                        </Menu.Button>
                        <Menu.Items>
                            <Menu.Item>
                                <NavLink to="/">
                                    Профиль
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item
                                onClick={handleLogout}
                            >
                                <button>
                                    Выход
                                </button>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                ) : (
                    <StyledNavLink to="/auth/login" styleType='button'>
                        Войти
                    </StyledNavLink>
                )}
            </NavBarLinkList>
        </div>
    )
}

export default NavBar
