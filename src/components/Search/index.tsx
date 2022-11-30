import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loading from 'components/loading';

import { FaSearch } from "react-icons/fa";

import 'styles/search.scss';

import RepoCards from "./repoCards";
import SelectBox from './selectBox';

const Index = () => {
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

        const sort = curValue && curValue !== 'default' ? `&sort=${curValue}` : '';

        axios.get(`https://api.github.com/search/repositories?q=${searchText}${sort}`)
            .then((res) => {
                setRepos(res.data.items);
            }).catch((error) => {
                console.log(error);
            }).then(() => setLoading(false));
    };

    useEffect(() => {
    }, [sortSelectValue, repos])

    return (
        <>
            <Loading isLoading={loading}/>
            <div className="search">
                {/*<form onSubmit={SearchRepos} >*/}
                {/*    <label htmlFor="searchText">*/}
                {/*        <input*/}
                {/*            id="searchText"*/}
                {/*            type="text"*/}
                {/*            placeholder="레포지토리 이름으로 검색"*/}
                {/*            value={searchText}*/}
                {/*            onChange={e => setSearchText(e.target.value)}*/}
                {/*        />*/}
                {/*    </label>*/}
                {/*    <SelectBox*/}
                {/*        sortView={sortView}*/}
                {/*        setSortView={setSortView}*/}
                {/*        sortSelectValue={sortSelectValue}*/}
                {/*        setSortSelectValue={setSortSelectValue}*/}
                {/*        searchText={searchText}*/}
                {/*        fetchRepos={fetchRepos}*/}
                {/*    />*/}
                {/*    <button><FaSearch /></button>*/}
                {/*</form>*/}
                {
                    repos.length !== 0 &&
                    <RepoCards
                        repos={repos}
                        viewIssueArr={viewIssueArr}
                    />
                }
            </div>
        </>
    );
}

export default Index;