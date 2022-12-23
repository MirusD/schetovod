import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import {
    PlusIcon,
    MinusIcon,
    ArrowsRightLeftIcon,
    TrashIcon,
    WrenchIcon
} from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

const BankAccountControllerBar = ({ disabled }) => {
    const { bankAccountId } = useParams()
    const dispatch = useDispatch()
    const handleClick = (name) => {
        if (!disabled) dispatch(setCurrentOpenModal({ current: name, data: bankAccountId }))
    }
    const styles = 'h-14 w-14 rounded-md text-white flex justify-center items-center transition ' + (disabled ? ' bg-gray-300' : 'hover:bg-green-400 bg-green-300')
    return (
            <div className="flex items-center space-x-2 mb-3">
                <Tooltip title="Добавить поступление">
                    <button className={styles} onClick={() => handleClick('profit')}>
                        <PlusIcon className="h-auto w-10"/>
                    </button>
                </Tooltip>
                <Tooltip title="Добавить трату">
                    <button className={styles} onClick={() => handleClick('expense')}>
                        <MinusIcon className="h-auto w-10"/>
                    </button>
                </Tooltip>
                <Tooltip title="Перевести на другой счет">
                    <button className={styles} onClick={() => handleClick('transfer')}>
                        <ArrowsRightLeftIcon className="h-auto w-10"/>
                    </button>
                </Tooltip>
                <Tooltip title="Настроить">
                    <button
                        className={`${styles} ${!disabled ? 'hover:bg-blue-400 bg-blue-300' : ''}`}
                        onClick={() => handleClick('settings')}
                    >
                        <WrenchIcon className="h-auto w-10"/>
                    </button>
                </Tooltip>
                <Tooltip title="Удалить счет ">
                    <button
                        className={`${styles} ${!disabled ? 'bg-red-300 hover:bg-red-400' : ''}`}
                        onClick={() => handleClick('remove')}
                    >
                        <TrashIcon className="h-auto w-10"/>
                    </button>
                </Tooltip>
            </div>
    )
}

BankAccountControllerBar.propTypes = {
    disabled: PropTypes.bool
}

export default BankAccountControllerBar
