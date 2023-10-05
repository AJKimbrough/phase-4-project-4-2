import React, { useState } from "react";


const Modal = ({name, price, description}) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <button className="view-button" onClick={openModal}>View Product</button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                        &times;
                    </span>
                    <h2>{name}</h2>
                    <p>{price}</p>
                    <p>{description}</p>
                </div>
            </div>
            )}
        </div>
    )

}

export default Modal