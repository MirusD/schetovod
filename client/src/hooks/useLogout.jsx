import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/', { replace: false })
        dispatch(logout())
    }
    return handleLogout
}

export default useLogout
