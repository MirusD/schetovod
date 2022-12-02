import React  from 'react'
import {useDispatch} from "react-redux";
import {setCurrentOpenModal} from "../store/modalControllerSlice";

const Modal = ({ children }) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setCurrentOpenModal(''))
    }
    return (
        <div className={`absolute z-10 top-0 left-0 flex justify-center items-start h-screen w-screen bg-black/30`} onClick={handleClick}>
            <div className={`bg-white rounded-md mt-16 w-96`} onClick={(e) => e.stopPropagation()}>
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

export default Modal
