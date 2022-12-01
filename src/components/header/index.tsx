import React, {useState} from "react";

import { FaSearch, FaUserCircle } from "react-icons/fa";
import { GrLinkPrevious, GrClose } from "react-icons/gr";

import 'styles/header.scss';

import { useRecoilState } from 'recoil';
import { searchText } from 'store';

const Header = () : JSX.Element => {
    const [inputText, setInputText] = useRecoilState<string>(searchText);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const closeSearching = () => {
        setIsSearching(prev => !prev);
    };

    const delSearchText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setInputText('');
    };

    const goToSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputText) {
            alert('not inputText');
            return false;
        }

        window.location.href = `/search?q=${inputText}`;
    }

    return (
        <header className="header">
            <div className="inner">
                <h1><a href="./" rel="noopener noreferrer">COI</a></h1>
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
                                value={inputText}
                                onChange={e => setInputText(e.target.value)}
                            />
                        </label>
                        <button type="button" onClick={e => delSearchText(e)}><GrClose/></button>
                    </form>
                }
            </div>
        </header>
    )
}

export default Header;