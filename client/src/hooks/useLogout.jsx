import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"

const useLogout = () => {
    const dispatch = useDispatch()
    const handleLogout = () => dispatch(logout())
    return handleLogout
}

export default useLogout
