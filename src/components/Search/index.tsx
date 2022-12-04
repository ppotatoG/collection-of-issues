import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import axios from 'axios';
import Loading from 'components/loading';

import 'styles/search.scss';

import RepoCards from "./repoCards";

const Search = () => {
    const [searchParams, ] = useSearchParams();
    const [searchResult, setSearchResult] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const qString = searchParams.get('q');

    const fetchRepos = useCallback(async () => {
        try {
            if (!qString) return false;
            setLoading(true);
            const res = await axios.get(`https://api.github.com/search/repositories?q=${qString}`);
            setSearchResult(res.data.items);
        } catch (e) {
            console.error(`${e} fetchIssues CALL FAILURE`);
        } finally {
            setLoading(false);
        }
    }, [qString]);

    useEffect(() => {
        fetchRepos().then();
    }, [fetchRepos, qString])

    return (
        <>
            <Loading isLoading={loading}/>
            {
                searchResult.length !== 0 &&
                <div className="search">
                    <RepoCards searchResult={searchResult}/>
                </div>
            }
        </>
    );
}

export default Search;