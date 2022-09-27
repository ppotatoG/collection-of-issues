import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loading from 'components/loading';

import { Repositories } from 'types';
import { FaSearch, FaLink, FaPlus, FaSortDown} from "react-icons/fa";

import 'styles/search.scss';

const SearchForm = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [repos, setRepos] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [sortView, setSortView] = useState<boolean>(false);
    const [sortSelectValue, setSortSelectValue] = useState<string>('');

    const viewIssueArr : string[] = JSON.parse(localStorage.getItem('viewIssue') || '[]');

    const SearchRepos = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchRepos();
        window.scrollTo(0, 0);
    };

    const fetchRepos = (curValue? : string) => {
        if (!searchText) return alert('레포지토리명을 입력해주세요');

        setLoading(true);
        setSortView(false);

        // TODO : error undefind
        const sort = curValue && curValue !== 'default' ? `&sort=${curValue}` : '';

        axios.get(`https://api.github.com/search/repositories?q=${searchText}${sort}`)
            .then((res) => {
                // console.log(`https://api.github.com/search/repositories?q=${searchText}${sort}`)
                setRepos(res.data.items);
            }).catch((error) => {
                console.log(error);
            }).then(() => setLoading(false));
    };

    const addRepo = (url : string) => {
        if(viewIssueArr.length >= 4) {
            alert('등록 개수는 최대 4개로 제한');
            return false;
        }

        viewIssueArr.push(url);
        localStorage.setItem('viewIssue', JSON.stringify(viewIssueArr));

        alert('추가 완료');
    };

    const selectSort = ( selectedValue : string ) => {
        setSortSelectValue(selectedValue)
        setSortView(false);
        if (searchText) fetchRepos(selectedValue);
    }

    const SelectBox = () : JSX.Element => {
        const sortValues : string[] = [ 'default', 'stars', 'forks', 'updated' ];

        return (
            <div className="selectBox">
                <button
                    type="button" 
                    onClick={() => setSortView(!sortView)}
                    >
                        {sortSelectValue && <span>{sortSelectValue}</span>}
                        <FaSortDown/>
                    </button>
                <ul>
                    {
                    sortView &&
                    sortValues.map((curValue : string, idx : number) => {
                        return (
                            <li
                                key={idx}
                                value={curValue}
                                onClick={() => selectSort(curValue)}
                            >
                                {curValue}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    const ViewRepos = () : JSX.Element => {
        return (
            <ul className="repo">
                {
                    repos.map((val : Repositories, idx: number) => {
                        const update = new Intl.DateTimeFormat('ko').format(new Date(val.updated_at)).slice(0, -1);
                        return (
                            <li className="repo__item" key={idx}>
                                <div className="inner__text">
                                    <h3>{val.name}</h3>
                                    <p>{val.description}</p>
                                    <p>updated_at {update}</p>
                                </div>
                                <div className="inner__status">
                                    {val.open_issues !== 0 && <p>issues : {val.open_issues}</p>}
                                    <button onClick={() => addRepo(val.url)}><FaPlus /></button>
                                    <a href={val.html_url} target="_blank" rel="noreferrer"><FaLink /></a>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    useEffect(() => {
        console.log(sortSelectValue)
    }, [sortSelectValue])

    return (
        <>
            { loading && <Loading /> }

            <div className="search">
                <form onSubmit={SearchRepos} >
                    <label htmlFor="searchText">
                        <input
                            id="searchText"
                            type="text"
                            placeholder="레포지토리 이름으로 검색"
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                        />
                    </label>
                    <SelectBox />
                    <button><FaSearch /></button>
                </form>
                {repos.length !== 0 && <ViewRepos />}
            </div>
        </>
    );
}

export default SearchForm;