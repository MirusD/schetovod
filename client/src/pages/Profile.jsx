import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, userUpdate } from '../store/authSlice'
import StyledTextField from '../components/common/form/styled/StyledTextField'
import SelectIconsField from '../components/common/form/SelectIconsField'
import Card from '../components/common/cards/Card'
import validator from '../utils/validator'
import { useNavigate } from 'react-router-dom'

const listIcons = [
    { label: '1', value: 'https://avatars.dicebear.com/api/avataaars/1.svg' },
    { label: '2', value: 'https://avatars.dicebear.com/api/avataaars/2.svg' },
    { label: '3', value: 'https://avatars.dicebear.com/api/avataaars/3.svg' },
    { label: '4', value: 'https://avatars.dicebear.com/api/avataaars/4.svg' },
    { label: '5', value: 'https://avatars.dicebear.com/api/avataaars/5.svg' },
    { label: '6', value: 'https://avatars.dicebear.com/api/avataaars/6.svg' },
    { label: '7', value: 'https://avatars.dicebear.com/api/avataaars/7.svg' },
    { label: '8', value: 'https://avatars.dicebear.com/api/avataaars/8.svg' },
    { label: '9', value: 'https://avatars.dicebear.com/api/avataaars/9.svg' },
    { label: '10', value: 'https://avatars.dicebear.com/api/avataaars/10.svg' },
    { label: '11', value: 'https://avatars.dicebear.com/api/avataaars/11.svg' },
    { label: '12', value: 'https://avatars.dicebear.com/api/avataaars/12.svg' },
    { label: '13', value: 'https://avatars.dicebear.com/api/avataaars/13.svg' },
    { label: '14', value: 'https://avatars.dicebear.com/api/avataaars/14.svg' }
]

const Profile = () => {
    const user = useSelector(getCurrentUser())
    const initialState = {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        password: ''
    }
    const [errors, setErrors] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState(initialState)
    const validatorConfig = {
        username: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        },
        email: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        }
    }
    const validate = (validateData = data) => {
        const errors = validator(validateData, validatorConfig)
        setErrors(prevState => ({ ...prevState, ...errors }))
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
    const handlerSubmite = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (isValid) {
            const dataForm = Object
                .keys(data)
                .reduce((acc, d) => data[d].length !== 0
                    ? { ...acc, [d]: data[d] }
                    : acc
                    , {})
            dispatch(userUpdate(dataForm))
            navigate('/dashboard/bank-accounts')
        }
    }
    return (
        <form className="flex grow flex-col justify-center items-center dark:text-slate-200" onSubmit={handlerSubmite}>
            <Card>
                <Card.Title>
                    Профиль
                </Card.Title>
                <SelectIconsField
                    name="avatar"
                    label="Аватар"
                    value={data.avatar}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={listIcons}
                />
                <StyledTextField
                    name='username'
                    label='Имя'
                    value={data.username}
                    placeholder={user.username}
                    onChange={handleChange}
                    error={errors?.username}
                />
                <StyledTextField
                    name='email'
                    label='Email'
                    value={data.email}
                    placeholder={user.email}
                    onChange={handleChange}
                    error={errors?.email}
                />
                <StyledTextField
                    name='password'
                    label='Новый пароль'
                    value={data.password}
                    placeholder="Новый пароль"
                    onChange={handleChange}
                    error={errors?.password}
                />
                <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8">
                    Сохранить
                </button>
            </Card>
        </form>
    )
}

export default Profile
