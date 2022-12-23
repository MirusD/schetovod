import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentOpenModal } from '../store/modalControllerSlice'
import Modal from './Modal'
import NewProfitForm from './Forms/NewProfitForm'
import NewExpenseForm from './Forms/NewExpenseForm'
import NewTransferForm from './Forms/NewTransferForm'
import NewLendForm from './Forms/NewLendForm'
import NewBankAccount from './Forms/NewBankAccount'
import BankAccountSettingsForm from './Forms/BankAccountSettingsForm'
import RemoveBankAccount from './RemoveBankAccount'
import TransactionDetails from './TransactionDetails'
import GroupEditFrom from './Forms/GroupEditFrom'
import CategoryEditForm from './Forms/CategoryEditForm'
import NewCategoryForm from './Forms/NewCategoryForm'
import RemoveCategory from './RemoveCategory'
import RemoveBankAccountGroup from './RemoveBankAccountGroup'

const Modals = () => {
    const { current, data } = useSelector(getCurrentOpenModal())
    return (
        <>
            {current === 'profit' &&
                <Modal>
                    <Modal.Title>Новое поступление</Modal.Title>
                    <Modal.Content>
                        <NewProfitForm bankAccountId={data}/>
                    </Modal.Content>
                </Modal>}
            {current === 'expense' &&
                <Modal>
                    <Modal.Title>Новая трата</Modal.Title>
                    <Modal.Content>
                        <NewExpenseForm bankAccountId={data}/>
                    </Modal.Content>
                </Modal>}
            {current === 'transfer' &&
                <Modal>
                    <Modal.Title>Новый перевод</Modal.Title>
                    <Modal.Content>
                        <NewTransferForm bankAccountId={data}/>
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
                        <NewBankAccount groupId={data}/>
                    </Modal.Content>
                </Modal>}
            {current === 'settings' &&
                <Modal>
                    <Modal.Title>Настойка счёта</Modal.Title>
                    <Modal.Content>
                        <BankAccountSettingsForm bankAccountId={data}/>
                    </Modal.Content>
                </Modal>}
            {current === 'remove' &&
                <Modal>
                    <Modal.Title>Удаление счёта</Modal.Title>
                    <Modal.Content>
                        <RemoveBankAccount bankAccountId={data}/>
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
            {current === 'groupEdit' &&
                <Modal>
                    <Modal.Title>Редактирование группы</Modal.Title>
                    <Modal.Content>
                        <GroupEditFrom groupId={data}/>
                    </Modal.Content>
                </Modal>
            }
            {current === 'categoryEdit' &&
                <Modal>
                    <Modal.Title>Редактирование категории</Modal.Title>
                    <Modal.Content>
                        <CategoryEditForm categoryId={data}/>
                    </Modal.Content>
                </Modal>
            }
            {current === 'newCategory' &&
                <Modal>
                    <Modal.Title>Новая категория</Modal.Title>
                    <Modal.Content>
                        <NewCategoryForm/>
                    </Modal.Content>
                </Modal>
            }
            {current === 'removeCategory' &&
                <Modal>
                    <Modal.Title>Новая категория</Modal.Title>
                    <Modal.Content>
                        <RemoveCategory categoryId={data}/>
                    </Modal.Content>
                </Modal>
            }
            {current === 'removeGroup' &&
                <Modal>
                    <Modal.Title>Удаление группы</Modal.Title>
                    <Modal.Content>
                        <RemoveBankAccountGroup groupId={data}/>
                    </Modal.Content>
                </Modal>
            }
        </>
    )
}

export default Modals
