import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBankAccountsList, getBankAccountsNoExisting, recoveryBankAccount } from '../store/bankAccountsSlice'
import CardInfo from '../components/common/cards/CardInfo'
import { getBankAccountGroupsList } from '../store/bankAccountGroupsSlice'
import PropTypes from 'prop-types'
import { setCurrentOpenModal } from '../store/modalControllerSlice'
import { getBankAccountTypeById } from '../store/typeBankAccountsSlice'
import useLoading from '../hooks/useLoading'

const BankAccountItem = ({ item, onEdit, onRemove, onRevocer }) => {
    const typeBankAccount = useSelector(getBankAccountTypeById(item.typeId))

    return (
        <li className=" py-2 px-4 cursor-pointer hover:bg-green-100 flex justify-between items-center border-b last:border-none">
            <div className="grid grid-cols-3 items-center grow">
                <div className="flex items-center">
                    <img
                        className="h-10 mr-2"
                        src={item.icon}
                    />
                    <span>{item.name}</span>
                </div>
                <span>{typeBankAccount.name}</span>
                <span>{item.amount}</span>
            </div>
            {item.existing ? (
                <div>
                    <button
                        className="bg-green-600 hover:bg-green-500 focus:outline-none rounded-md text-white py-1 px-3 mr-2"
                        onClick={() => onEdit(item._id)}
                    >
                        Изменить
                    </button>
                    <button
                        className="bg-red-700 hover:bg-red-600 focus:outline-none rounded-md text-white py-1 px-3"
                        onClick={() => onRemove(item._id)}
                    >
                        Удалить
                    </button>
                </div>
            ) : (
                <button
                    className="bg-green-600 hover:bg-green-500 focus:outline-none rounded-md text-white py-1 px-3"
                    onClick={() => onRevocer(item._id)}
                >
                    Востановить
                </button>
            )
            }
        </li>
    )
}

const BankAccountsSettingsPage = () => {
    const dispatch = useDispatch()
    const { isLoadingBankAccountGroups, isLoadingBankAccounts, isLoadingBankAccountTypes } = useLoading()
    const bankAccounts = useSelector(getBankAccountsList())
    const bankAccountGroups = useSelector(getBankAccountGroupsList())
    const bankAccountsNoExisting = useSelector(getBankAccountsNoExisting())
    const handleCreateNewBankAccount = () => {
        dispatch(setCurrentOpenModal({ current: 'newBankAccount' }))
    }
    const handleEditBankAccount = (id) => {
        dispatch(setCurrentOpenModal({ current: 'settings', data: id }))
    }
    const handleRemoveBankAccount = (id) => {
        dispatch(setCurrentOpenModal({ current: 'remove', data: id }))
    }
    const handleRecoveryBankAccount = (id) => {
        dispatch(recoveryBankAccount(id))
    }

    if (isLoadingBankAccountGroups || isLoadingBankAccounts || isLoadingBankAccountTypes) {
        return <BankAccountSettingsSkeleton/>
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl">Настройка счетов</h1>
                <button
                    className="inline-flex items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none"
                    onClick={handleCreateNewBankAccount}
                >
                    Добавить счет
                </button>
            </div>
            {bankAccountGroups.map(group => (
                <CardInfo key={group._id}>
                    <CardInfo.Title>
                        <span>{group.name}</span>
                    </CardInfo.Title>
                    <CardInfo.Content>
                        <ul>
                            {bankAccounts
                                .filter(ba => ba.groupId === group._id)
                                .map(ba => (
                                    <BankAccountItem
                                        key={ba._id}
                                        item={ba}
                                        onEdit={handleEditBankAccount}
                                        onRemove={handleRemoveBankAccount}
                                    />
                                ))
                            }
                        </ul>
                    </CardInfo.Content>
                </CardInfo>
            ))}
            {bankAccountsNoExisting.length !== 0 &&
                <CardInfo>
                    <CardInfo.Title>
                        Удалённые счета
                    </CardInfo.Title>
                    <CardInfo.Content>
                        {bankAccountsNoExisting
                            .map(ba => (
                                <BankAccountItem
                                    key={ba._id}
                                    item={ba}
                                    existing={ba.existing}
                                    onEdit={handleEditBankAccount}
                                    onRevocer={handleRecoveryBankAccount}
                                />
                            ))
                        }
                    </CardInfo.Content>
                </CardInfo>
            }
        </div>
    )
}

function BankAccountSettingsSkeleton() {
    return (
        <div className='relative group rounded-md opacity-75 animate-pulse'>
            <div className='absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl'></div>
            <div className='relative'>
                <div className='h-16 mb-4 w-full bg-slate-300 rounded-md'></div>
                <div className='h-32 mb-4 w-full bg-slate-300 rounded-md'></div>
                <div className='h-32 mb-4 w-full bg-slate-300 rounded-md'></div>
                <div className='h-32 mb-4 w-full bg-slate-300 rounded-md'></div>
            </div>
        </div>
    )
}

BankAccountItem.propTypes = {
    item: PropTypes.object,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onRevocer: PropTypes.func
}

export default BankAccountsSettingsPage
