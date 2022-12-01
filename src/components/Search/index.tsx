import React, {useState, useEffect, useCallback} from "react";
import axios from 'axios';
import Loading from 'components/loading';

import 'styles/search.scss';

import RepoCards from "./repoCards";
import {useSearchParams} from "react-router-dom";

const Search = () => {
    const [searchParams, ] = useSearchParams();
    const [repos, setRepos] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const viewIssueArr : string[] = JSON.parse(localStorage.getItem('viewIssue') || '[]');

    const qString = searchParams.get('q');

    const fetchRepos = useCallback(async () => {
        try {
            if (!qString) return false;
            setLoading(true);

            const res = await axios.get(`https://api.github.com/search/repositories?q=${qString}`);
            setRepos(res.data.items);

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
                repos.length !== 0 &&
                <div className="search">
                    <RepoCards
                        repos={repos}
                        viewIssueArr={viewIssueArr}
                    />
                </div>
            }
        </>
    );
}

export default Search;