import React from 'react'
import Modal from './Modal'
import NewProfitForm from './Forms/NewProfitForm'
import NewExpenseForm from './Forms/NewExpenseForm'
import NewTransferForm from './Forms/NewTransferForm'
import NewLendForm from './Forms/NewLendForm'
import { useSelector } from 'react-redux'
import { getCurrentOpenModal } from '../store/modalControllerSlice'
import NewBankAccount from './Forms/NewBankAccount'
import BankAccountSettingsForm from './Forms/BankAccountSettingsForm'
import RemoveBankAccount from './RemoveBankAccount'
import TransactionDetails from './TransactionDetails'

const Modals = () => {
    const { current } = useSelector(getCurrentOpenModal())
    return (
        <>
            {current === 'profit' &&
                <Modal>
                    <Modal.Title>Новое поступление</Modal.Title>
                    <Modal.Content>
                        <NewProfitForm/>
                    </Modal.Content>
                </Modal>}
            {current === 'expense' &&
                <Modal>
                    <Modal.Title>Новая трата</Modal.Title>
                    <Modal.Content>
                        <NewExpenseForm/>
                    </Modal.Content>
                </Modal>}
            {current === 'transfer' &&
                <Modal>
                    <Modal.Title>Новый перевод</Modal.Title>
                    <Modal.Content>
                        <NewTransferForm/>
                    </Modal.Content>
                </Modal>}
            {current === 'lend' &&
                <Modal>
                    <Modal.Title>Новый заём</Modal.Title>
                    <Modal.Content>
                        <NewLendForm/>
                    </Modal.Content>
                </Modal>}
            {current === 'newBankAccount' &&
                <Modal>
                    <Modal.Title>Новый счёт</Modal.Title>
                    <Modal.Content>
                        <NewBankAccount/>
                    </Modal.Content>
                </Modal>}
            {current === 'settings' &&
                <Modal>
                    <Modal.Title>Настойка счёта</Modal.Title>
                    <Modal.Content>
                        <BankAccountSettingsForm/>
                    </Modal.Content>
                </Modal>}
            {current === 'remove' &&
                <Modal>
                    <Modal.Title>Удаление счёта</Modal.Title>
                    <Modal.Content>
                        <RemoveBankAccount/>
                    </Modal.Content>
                </Modal>}
            {current === 'transaction' &&
                <Modal>
                    <Modal.Title>Детали операции</Modal.Title>
                    <Modal.Content>
                        <TransactionDetails/>
                    </Modal.Content>
                </Modal>
            }
        </>
    )
}

export default Modals
