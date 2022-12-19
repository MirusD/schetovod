import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getBankAccountsList, getBankAccountsLoadingStatus } from '../../store/bankAccountsSlice'
import { getBankAccountGroupsList, getBankAccountGroupsLoadingStatus } from '../../store/bankAccountGroupsSlice'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'
import { PlusIcon } from '@heroicons/react/24/outline'
import BankAccountsList from './bankAccountsList'

const BankAccountsBar = () => {
    const skeletonCount = 5
    const [selectedBankAccount, setSelectedBankAccount] = useState()
    const [openGroup, setOpenGroup] = useState({})
    const bankAccountGroups = useSelector(getBankAccountGroupsList())
    const loadingBankAccountsStatus = useSelector(getBankAccountsLoadingStatus())
    const loadingGroupsStatus = useSelector(getBankAccountGroupsLoadingStatus())
    const bankAccounts = useSelector(getBankAccountsList())
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = loadingBankAccountsStatus === 'idle' || loadingBankAccountsStatus === 'pending' ||
        loadingGroupsStatus === 'idle' || loadingGroupsStatus === 'pending'

    const handleClickGroup = (id) => {
        setOpenGroup(prevState => ({ ...prevState, [id]: !prevState[id] }))
    }

    const handleClickBankAccount = (id) => {
        if (selectedBankAccount === id) {
            setSelectedBankAccount(null)
            navigate('/dashboard/bank-accounts/')
        } else {
            setSelectedBankAccount(id)
            navigate(`/dashboard/bank-accounts/${id}`)
        }
    }

    useEffect(() => {
        if (!isLoading) {
            setOpenGroup(prevState => bankAccountGroups
                .reduce((acc, g, i) => ({ ...prevState, ...acc, [g._id]: i === 0 && true }), {}))
        }
    }, [isLoading])

    return (
        <div>
            <BankAccountsList>
                {isLoading &&
                    new Array(skeletonCount)
                        .fill('')
                        .map((_, index) => (
                            <BankAccountsList.ItemSkeleton key={'skeleton' + index}/>
                    ))}
                {bankAccounts && !isLoading &&
                    bankAccountGroups.map(group => (
                        <BankAccountsList.Group
                            key={group._id}
                            name={group.name}
                            id={group._id}
                            isOpen={openGroup[group._id]}
                            onClick={handleClickGroup}
                        >
                            {bankAccounts
                                .filter(ba => ba.groupId === group._id)
                                .map(ba => (
                                    <BankAccountsList.Item key={ba._id} item={ba} onClick={handleClickBankAccount}/>
                                ))
                            }
                            <li className={'flex flex-col py-2 px-2 hover:bg-green-100 cursor-pointer h-24 w-full rounded-md shadow-xl bg-white'}
                                onClick={() => dispatch(setCurrentOpenModal({ current: 'newBankAccount' }))}>
                                <PlusIcon/>
                            </li>
                        </BankAccountsList.Group>
                    ))
                }
                {!bankAccounts.length && !isLoading &&
                    <li className={'flex flex-col py-2 px-2 hover:bg-green-100 cursor-pointer h-24 w-full rounded-md shadow-xl bg-white'}
                        onClick={() => dispatch(setCurrentOpenModal({ current: 'newBankAccount' }))}>
                        <PlusIcon/>
                    </li>
                }
            </BankAccountsList>
        </div>
    )
}

export default BankAccountsBar
