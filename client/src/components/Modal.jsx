import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentOpenModal } from '../store/modalControllerSlice'
import PropTypes from 'prop-types'

const Modal = ({ children }) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setCurrentOpenModal(''))
    }
    return (
        <div className={'fixed z-50 top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-black/30'} onClick={handleClick}>
            <div className={'bg-white rounded-md w-96'} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

const ModalTitle = ({ children, label }) => {
    return (
        <h2 className="text-lg font-bold border-b p-4">{children || label}</h2>
    )
}

const ModalContent = ({ children }) => {
    return (
        <div className="p-4 pt-0">
            { children }
        </div>
    )
}

Modal.Title = ModalTitle
Modal.Content = ModalContent

Modal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
ModalTitle.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    label: PropTypes.string
}
ModalContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Modal
