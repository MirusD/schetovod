import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBankAccountById, removeBankAccount } from '../store/bankAccountsSlice'
import { setCurrentOpenModal } from '../store/modalControllerSlice'
import PropTypes from 'prop-types'

const RemoveBankAccount = ({ bankAccountId }) => {
    const currentBankAccount = useSelector(getBankAccountById(bankAccountId))
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(setCurrentOpenModal(''))
    }
    const handleRemoveBankAccount = () => {
        dispatch(removeBankAccount(bankAccountId))
        closeModal()
    }
    const classPrimaryBtn = 'inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8'
    const classWarningBtn = 'inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none my-2 mt-8'
    return (
        <div>
            {currentBankAccount.amount > 0
                ? <div>
                    <p>На вашем счету остались средства!</p>
                    <p>Для того что бы удалить счёт переведите денежные средства на другие счета. Вы можете исправить данные счёта через настройки</p>
                    <button className={classPrimaryBtn} onClick={closeModal}>ОК</button>
                </div>
                : <div>
                    <p>Вы уверены что хотите удалить счёт</p>
                    <div className="grid grid-cols-2 gap-2">
                        <button className={classWarningBtn} onClick={handleRemoveBankAccount}>Да</button>
                        <button className={classPrimaryBtn} onClick={closeModal}>Отмена</button>
                    </div>
                </div>}
        </div>
    )
}

RemoveBankAccount.propTypes = {
    bankAccountId: PropTypes.string
}

export default RemoveBankAccount
