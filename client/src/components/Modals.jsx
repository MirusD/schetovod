import React from 'react'
import Modal from "./Modal"
import NewProfitForm from "./Forms/NewProfitForm"
import NewExpenseForm from "./Forms/NewExpenseForm"
import NewTransferForm from "./Forms/NewTransferForm"
import NewLendForm from "./Forms/NewLendForm"
import {useSelector} from "react-redux"
import {getCurrentOpenModal} from "../store/modalControllerSlice"
import NewBankAccount from "./Forms/NewBankAccount";
import BankAccountSettingsForm from "./Forms/BankAccountSettingsForm";

const Modals = () => {
    const currentOpenModal = useSelector(getCurrentOpenModal())
    return (
        <>
            {currentOpenModal === 'profit' &&
                <Modal>
                    <Modal.Title>Новое поступление</Modal.Title>
                    <Modal.Content>
                        <NewProfitForm/>
                    </Modal.Content>
                </Modal>}
            {currentOpenModal === 'expense' &&
                <Modal>
                    <Modal.Title>Новая трата</Modal.Title>
                    <Modal.Content>
                        <NewExpenseForm/>
                    </Modal.Content>
                </Modal>}
            {currentOpenModal === 'transfer' &&
                <Modal>
                    <Modal.Title>Новый перевод</Modal.Title>
                    <Modal.Content>
                        <NewTransferForm/>
                    </Modal.Content>
                </Modal>}
            {currentOpenModal === 'lend' &&
                <Modal>
                    <Modal.Title>Новый заём</Modal.Title>
                    <Modal.Content>
                        <NewLendForm/>
                    </Modal.Content>
                </Modal>}
            {currentOpenModal === 'newBankAccount' &&
                <Modal>
                    <Modal.Title>Новый счёт</Modal.Title>
                    <Modal.Content>
                        <NewBankAccount/>
                    </Modal.Content>
                </Modal>}
            {currentOpenModal === 'settings' &&
                <Modal>
                    <Modal.Title>Настойка счёта</Modal.Title>
                    <Modal.Content>
                        <BankAccountSettingsForm/>
                    </Modal.Content>
                </Modal>}
        </>
    )
}

export default Modals
