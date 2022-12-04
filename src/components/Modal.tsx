import Modal from 'react-modal';
import { useRecoilState } from "recoil";
import { modalOpen } from 'store/modalOpen';

interface CustomModalProp {
    text: string
}

const CustomModal = ({text} : CustomModalProp ) : JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalOpen);

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
