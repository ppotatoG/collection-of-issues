import React, {useState} from "react";
import axios from 'axios';
import Loading from 'components/loading';

import { Repositories } from 'types';
import { FaSearch, FaLink, FaPlus } from "react-icons/fa";

import 'styles/search.scss';

const SearchForm = () => {
    const [searchText, setSearchText] = useState<string | ''>('');
    const [repos, setRepos] = useState<[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const SearchRepos = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchRepos();
        window.scrollTo(0, 0);
    };

    const fetchRepos = () => {
        setLoading(true);

        axios.get(`https://api.github.com/search/repositories?q=${searchText}`)
            .then((res) => {
                setRepos(res.data.items);
            }).catch((error) => {
                console.log(error);
            }).then(() => setLoading(false));
    };

    const viewIssueArr : string[] = [];

    const addRepo = (url : string) => {
        const viewIssue : string = JSON.parse(localStorage.getItem('viewIssue') || '{}');

        if(viewIssue.length >= 4) {
            alert('등록 개수는 최대 4개로 제한');
            return false;
        }

        viewIssueArr.push(url);
        localStorage.setItem('viewIssue', JSON.stringify(viewIssueArr));
        
        alert('추가 완료');
    };

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
                    <button><FaSearch /></button>
                </form>

                {
                    repos?.length &&
                    <ul className="repo">
                        {
                            repos.map((val : Repositories, idx: number) => {
                                return (
                                    <li className="repo__item" key={idx}>
                                        <div className="inner__text">
                                            <h3>{val.name}</h3>
                                            <p>{val.description}</p>
                                            <p>updated_at {val.updated_at}</p>
                                        </div>
                                        <div className="inner__status">
                                            {/*TODO : 0개 초과일때만 노출*/}
                                            <p>issues : {val.open_issues}</p>
                                            <button onClick={() => addRepo(val.url)}><FaPlus /></button>
                                            <a href={val.html_url} target="_blank" rel="noreferrer"><FaLink /></a>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        </>
    );
}

export default SearchForm;