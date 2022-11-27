import React, {useState} from "react";

import { FaSearch, FaUserCircle } from "react-icons/fa";
import { GrLinkPrevious, GrClose } from "react-icons/gr";

import 'styles/header.scss';

import CharacterCounter from 'store';

const Header = () : JSX.Element => {
    return <CharacterCounter />

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');

    const closeSearching = () => {
        setIsSearching(prev => !prev);
        setSearchText('');
    };

    const delSearchText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSearchText('');
    };

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
                    <form action="">
                        <button onClick={closeSearching}><GrLinkPrevious/></button>
                        <label htmlFor="searchText">
                            <input
                                id="searchText"
                                type="text"
                                placeholder="레포지토리 이름으로 검색"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </label>
                        <button onClick={e => delSearchText(e)}><GrClose/></button>
                    </form>
                }
            </div>
        </header>
    )
}

export default Header;