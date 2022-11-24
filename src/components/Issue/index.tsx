import React, {useState, useEffect, useCallback} from "react";
import axios from 'axios';
import Loading from 'components/loading';

import BlankContent from "./blankContent";
import Contents from "./contents";

import {IssuesType} from "types";

import 'styles/issues.scss';

const Issues = () => {
    const [issues, setIssues] = useState<IssuesType[]>([]);
    const [repos, setRepos] = useState<string[]>(JSON.parse(localStorage.getItem('viewIssue') || '[]'));
    const [loading, setLoading] = useState<boolean>(false);

    const fetchIssues = useCallback(async () => {
        try {
            setLoading(true);
            if (Object.keys(repos).length) {
                setIssues([]);
                const res = await axios.all(repos.map((repo: string) => axios.get(`${repo}/issues`)));
                res.map(item => setIssues((prevIssue: IssuesType[]) => [...prevIssue, ...item.data]));
            }
        } catch (e) {
            console.error(`${e} fetchIssues CALL FAILURE`);
        } finally {
            setLoading(false);
        }
    }, [repos]);

    useEffect(() => {
        localStorage.setItem('viewIssue', JSON.stringify(repos));
        fetchIssues().then();
    }, [fetchIssues, repos]);

    const ViewIssues = (): JSX.Element => {
        if (repos.length === 0) return <BlankContent blankType={'저장된 레포지토리가 없어요'}/>
        if (issues.length === 0) return <BlankContent blankType={'저장된 레포지토리 내에 추가된 이슈가 없어요'}/>
        return (
            <Contents
                repos={repos}
                setRepos={setRepos}
                issues={issues}
           />
        )
    }

    return (
        <div>
            <Loading isLoading={loading}/>
            <ViewIssues/>
        </div>
    );
}

export default Issues;