import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'
import { createTheme } from '@mui/material/styles'
import {ThemeProvider} from "@mui/material"
import {
    PlusIcon,
    MinusIcon,
    ArrowsRightLeftIcon,
    TrashIcon,
    ArrowUturnDownIcon,
    ArrowTrendingUpIcon,
    WrenchIcon
} from "@heroicons/react/24/outline"
import Modal from "../Modal";
import NewProfitForm from "../Forms/NewProfitForm"
import NewExpenseForm from "../Forms/NewExpenseForm"
import NewTransferForm from "../Forms/NewTransferForm"
import NewLendForm from "../Forms/NewLendForm"
import {useDispatch, useSelector} from "react-redux"
import {getCurrentOpenModal, setCurrentOpenModal} from "../../store/modalControllerSlice";

const theme = createTheme({
    typography: {
        fontSize: 18,
    },
});

const BankAccountControllerBar = () => {
    const dispatch = useDispatch()
    const handleClick = (name) => {
        dispatch(setCurrentOpenModal(name))
    }
    const styles = "h-14 w-14 bg-green-300 rounded-md text-white flex justify-center items-center hover:bg-green-400 transition"
    return (
        <ThemeProvider theme={theme}>
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
                {/*<Tooltip title="Дать в долг">*/}
                {/*    <button className={styles} onClick={() => handleClick('lend')}>*/}
                {/*        <ArrowUturnDownIcon className="h-auto w-10"/>*/}
                {/*    </button>*/}
                {/*</Tooltip>*/}
                {/*<Tooltip title="Инвестировать">*/}
                {/*    <button className={styles} onClick={() => handleClick('invest')}>*/}
                {/*        <ArrowTrendingUpIcon className="h-auto w-10"/>*/}
                {/*    </button>*/}
                {/*</Tooltip>*/}
                <Tooltip title="Настроить">
                    <button className={`${styles} bg-blue-300 hover:bg-blue-400`} onClick={() => handleClick('settings')}>
                        <WrenchIcon className="h-auto w-10"/>
                    </button>
                </Tooltip>
                <Tooltip title="Удалить счет">
                    <button className={`${styles} bg-red-300 hover:bg-red-400`} onClick={() => handleClick('remove')}>
                        <TrashIcon className="h-auto w-10"/>
                    </button>
                </Tooltip>
            </div>
        </ThemeProvider>
    )
}

export default BankAccountControllerBar
