import React, { useState } from 'react'
import Card from '../components/common/cards/Card'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'
import LoginForm from '../components/Forms/LoginForm'
import StyledNavLink from '../components/common/StyledNavLink'
import { getMessage } from '../store/messageSlice'

const LoginPage = () => {
    const [successful, setSuccessful] = useState(false)
    const message = useSelector(getMessage())
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = (formData) => {
        const redirect = location.state ? location.state.referrer.pathname : '/dashboard/bank-accounts'
        dispatch(login(formData))
            .unwrap()
            .then(() => {
                setSuccessful(true)
                navigate(redirect, { replace: true })
            })
            .catch(() => {
                setSuccessful(false)
            })
    }

    return (
        <>
            <div className="mb-12 text-slate-900">
                <Card.Title>Вход</Card.Title>
                <LoginForm onSubmite={ handleSubmit }/>
            </div>
            {message && (
                <div className='form-group'>
                    <div
                        className={
                            successful
                                ? 'alert alert-success'
                                : 'alert alert-danger'
                        }
                        role='alert'
                    >
                        {message}
                    </div>
                </div>
            )}
            <p className='text-slate-600 text-sm'>
                <span> Нет учетной записи? </span>
                <StyledNavLink styleType='underline' to='/auth/signup'>
                    Зарегестрироваться
                </StyledNavLink>
            </p>
        </>
    )
}

export default LoginPage
