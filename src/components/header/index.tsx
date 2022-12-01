import React, {useState} from "react";
import { useNavigate, Link } from 'react-router-dom';

import { FaSearch, FaUserCircle } from "react-icons/fa";
import { GrLinkPrevious, GrClose } from "react-icons/gr";

import CustomModal from 'components/Modal';

import 'styles/header.scss';

const Header = () : JSX.Element => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const closeSearching = () => {
        setIsSearching(prev => !prev);
    };

    const delSearchText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSearchText('');
    };

    const goToSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchText) {
            setModalIsOpen(prev => !prev);
            return false;
        }

        navigate(`/search?q=${searchText}`);
    }

    return (
        <header className="header">
            <div className="inner">
                <h1><Link to="./">COI</Link></h1>
                <ul>
                    <li><button onClick={closeSearching}><FaSearch /></button></li>
                    <li><a href="./search" rel="noopener noreferrer"><FaUserCircle /></a></li>
                </ul>
                {
                    isSearching &&
                    <form onSubmit={goToSearch}>
                        <button type="button" onClick={closeSearching}><GrLinkPrevious/></button>
                        <label htmlFor="inputText">
                            <input
                                id="inputText"
                                type="text"
                                placeholder="레포지토리 이름으로 검색"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </label>
                        <button type="button" onClick={e => delSearchText(e)}><GrClose/></button>
                    </form>
                }
            </div>
            {
                modalIsOpen &&
                <CustomModal
                    text={'검색어를 입력해주세요 :('}
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                />
            }
        </header>
    )
}

export default Header;