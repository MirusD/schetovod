import React, { useState } from "react"
import Card from "../components/Card"
import { useLocation, useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { signUp } from "../store/authSlice"
import RegistrationForm from "../components/Forms/RegistrationForm"
import StyledNavLink from "../components/StyledNavLink"
import { getMessage } from "../store/messageSlice"

const SignUpPage = () => {
    const [loading, setLoading] = useState(false)
    const [successful, setSuccessful] = useState(false)
    const message = useSelector(getMessage())
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (formData) => {
        const { username, email, password } = formData
        setLoading(true)
        setSuccessful(false)
        dispatch(signUp({ username, email, password }))
            .unwrap()
            .then(() => {
                setSuccessful(true)
                navigate("/dashboard", { replace: true })
            })
            .catch(() => {
                console.log('catch')
                setSuccessful(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <div className="mb-12 text-slate-900">
                <Card.Title>Регистрация</Card.Title>
                {!successful && <RegistrationForm onSubmite={handleSubmit}/>}
            </div>
            {message && (
                <div className='form-group'>
                    <div
                        className={
                            successful
                                ? "alert alert-success"
                                : "alert alert-danger"
                        }
                        role='alert'
                    >
                        {message}
                    </div>
                </div>
            )}
            <p className='text-slate-600 text-sm'>
                <span> Уже есть учетная запись? </span>
                <StyledNavLink styleType='underline' to='/auth/login'>
                    Войти
                </StyledNavLink>
            </p>
        </>
    )
}

export default SignUpPage
