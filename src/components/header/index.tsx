import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { GrLinkPrevious, GrClose } from 'react-icons/gr';

import CustomModal from 'components/Modal';
import UserState from './userState';

import 'styles/header.scss';
import { useRecoilState } from 'recoil';
import { modalOpen } from '../../store/modalOpen';

const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalOpen);
  const [isStateOpen, setIsStateOpen] = useState<boolean>(false);

  const closeSearching = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsSearching((prev) => !prev);
  };

  const delSearchText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSearchText('');
  };

  const stateToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsStateOpen((prev) => !prev);
  };

  const goToSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchText) {
      setIsModalOpen((prev) => !prev);
      return false;
    }

    navigate(`/search?q=${searchText}`);
  };

  return (
    <header className="header">
      <div className="inner">
        <h1>
          <Link to="./">COI</Link>
        </h1>
        <ul>
          <li>
            <button type="button" onClick={closeSearching}>
              <FaSearch />
            </button>
          </li>
          <li>
            <button type="button" onClick={stateToggle}>
              <FaUserCircle />
            </button>
            {isStateOpen && <UserState />}
          </li>
        </ul>
        {isSearching && (
          <form onSubmit={goToSearch}>
            <button type="button" onClick={closeSearching}>
              <GrLinkPrevious />
            </button>
            <label htmlFor="inputText">
              <input
                id="inputText"
                type="text"
                placeholder="레포지토리 이름으로 검색"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </label>
            <button type="button" onClick={delSearchText}>
              <GrClose />
            </button>
          </form>
        )}
      </div>
      {isModalOpen && <CustomModal text={'검색어를 입력해주세요 :('} />}
    </header>
  );
};

export default Header;
