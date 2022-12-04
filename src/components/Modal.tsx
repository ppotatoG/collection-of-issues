import Modal from 'react-modal';
import {Dispatch, SetStateAction} from "react";

interface CustomModalProp {
    text: string
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const CustomModal = ({
    text,
     isModalOpen,
     setIsModalOpen
}: CustomModalProp) : JSX.Element => {
    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                ariaHideApp={false}
                onRequestClose={() => setIsModalOpen(false)}
                style={customStyles}
            >
                <p>{text}</p>
                <div>
                    <button onClick={() => setIsModalOpen(false)}>확인</button>
                </div>
            </Modal>
        </div>
    );
}

const customStyles = {
    content: {
        minWidth: '300px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9
    },
};

export default CustomModal;
