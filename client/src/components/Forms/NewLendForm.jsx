import React, {useState} from 'react'
import StyledTextField from "../common/form/styled/StyledTextField";
import StyledSelectField from "../common/form/styled/StyledSelectField";

const categories = [
    {label: 'Иван Тупицо', value: '0'},
    {label: 'Эльвир Ситдиков', value: '1'},
    {label: 'Алича Шадрина', value: '2'},
]

const NewLendForm = () => {
    const initialState = {
        amount: '',
        to: ''
    }
    const [data, setData] = useState(initialState)
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
        console.log(data)
    }
    return (
        <>
            <form onSubmit={handlerSubmite}>
                <StyledTextField
                    name="amount"
                    label="Сумма"
                    type="number"
                    value={data.amount}
                    placeholder="Сумма"
                    onChange={handleChange}
                />
                <StyledSelectField
                    name="to"
                    label="Кому"
                    value={data.category}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={categories}
                />
                <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8">
                    Дать в долг
                </button>
            </form>
        </>
    )
}

export default NewLendForm
