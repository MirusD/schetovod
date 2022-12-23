import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBankAccountsList } from '../store/bankAccountsSlice'
import PropTypes from 'prop-types'
import { setCurrentOpenModal } from '../store/modalControllerSlice'
import { removeBankAccountGroup } from '../store/bankAccountGroupsSlice'

const RemoveBankAccountGroup = ({ groupId }) => {
    const dispatch = useDispatch()
    const bankAccounts = useSelector(getBankAccountsList())
    const isEmpty = bankAccounts.findIndex(ba => ba.groupId === groupId) === -1
    const handleRemoveGroup = () => {
        dispatch(removeBankAccountGroup(groupId))
        dispatch(setCurrentOpenModal(''))
    }
    const handleCancelRemoveGroup = () => {
        dispatch(setCurrentOpenModal(''))
    }
    return (
        <div>
            {!isEmpty
                ? <div>
                    <span>Данная группа содержит счета, прежде чем удалить группу нужно либо удалить счета, либо перекинуть их в другие группы</span>
                    <button
                        className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-4"
                        onClick={handleCancelRemoveGroup}
                    >
                        ОК
                    </button>
                </div>
                : (
                    <>
                        <span>
                            Вы уверены что хотите удалить группу
                        </span>
                        <div className="flex">
                            <button
                                className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none my-2 mt-4 mr-2"
                                onClick={handleRemoveGroup}
                            >
                                Да
                            </button>
                            <button
                                className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-4"
                                onClick={handleCancelRemoveGroup}
                            >
                                Отмена
                            </button>
                        </div>
                    </>
                )
            }
        </div>)
}

RemoveBankAccountGroup.propTypes = {
    groupId: PropTypes.string
}

export default RemoveBankAccountGroup
