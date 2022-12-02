import React, { useState, useEffect } from 'react'
import validator from '../../utils/validator'
import { UserIcon, KeyIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import StyledTextField from "../common/form/styled/StyledTextField"

const LoginForm = ({ onSubmite }) => {
    const initialValues = {
        login: "",
        password: ""
    }
    const [data, setData] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [usingField, setUsingField] = useState({login: false, password: false})

    const validatorConfig = {
        login: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        },
        password: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        }
    }
    const validate = (validateData = data) => {
        const errors = validator(validateData, validatorConfig)
        setErrors(prevState => ({...prevState, ...errors}))
        return Object.values(errors).filter(e => e !== '').length === 0
    }
    const handleChange = (target) => {
        const { name, value } = target
        if (target) {
            setData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }
    const handleSubmite = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (isValid) onSubmite(data)
    }
    const handleToucheField = ({target}) => {
        const { name, value } = target
        if (target) {
            setUsingField(prevState => ({
                ...prevState,
                [name]: true
            }))
            validate({
                [name]: value
            })
        }
    }

    return (
        <form onSubmit={handleSubmite}>
            <StyledTextField
                name="login"
                label="Логин"
                icon={[UserIcon]}
                placeholder="Логин"
                value={data.login}
                error={errors.login}
                using={usingField.login}
                onChange={handleChange}
                onBlur={handleToucheField}
            />
            <StyledTextField
                name="password"
                label="Пароль"
                type="password"
                icon={[KeyIcon, EyeIcon, EyeSlashIcon]}
                placeholder="Пароль"
                value={data.password}
                error={errors.password}
                using={usingField.password}
                onChange={handleChange}
                onBlur={handleToucheField}
            />
            <button
                className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-5"
            >
                Войти
            </button>
        </form>
    )
}

export default LoginForm
