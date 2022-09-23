import React, {useState} from "react";
import axios from 'axios';
import Loading from './loading';

import '../styles/search.scss';
import { FaSearch, FaLink, FaPlus } from "react-icons/fa";

import { Repositories } from '../types';

const SearchForm = () => {
    const [searchText, setSearchText] = useState<string | ''>('');
    const [repos, setRepos] = useState<Repositories | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const SearchRepos = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchRepos(searchText);
        window.scrollTo(0, 0);
    };

    const fetchRepos = async (repoName : string) => {
        setLoading(true);
        await axios.get(`https://api.github.com/search/repositories?q=${repoName}`)
            .then((response) => {
                // TODO : then 정리
                setRepos(null);

                setRepos(response.data.items.map((val: Repositories) => {
                    const {name, html_url, description, updated_at, open_issues, url} = val;
                    return {
                        name: name,
                        html_url: html_url,
                        description : description,
                        updated_at : updated_at,
                        url : url
                    };
                }))
            }).catch((error) => {
                alert(error);
            });

        setLoading(false);
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
                <form action="submit" onSubmit={SearchRepos} >
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
                    repos &&
                    <ul className="repo">
                        {
                            Object.values(repos).map((val : Repositories, idx: number) => {
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
                                            <a href={val.html_url} target="_blank"><FaLink /></a>
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