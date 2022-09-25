import React, {useState, useEffect} from "react";
import axios from 'axios';
import Loading from './loading';

import { issue } from '../types';
import { FaRegDotCircle, FaRegCommentAlt } from "react-icons/fa";

import '../styles/issues.scss';

const Issues = () => {
    const [issues, setIssues] = useState<issue[] | null>(JSON.parse(localStorage.getItem('viewIssue') || '{}'));
    const [loading, setLoading] = useState<boolean>(true);

    const repos = JSON.parse(localStorage.getItem('viewIssue') || '{}');
    const getIssueUrls = repos.map((v : string) => axios.get(`${v}/issues`));

    const fetchRepos = () => {
        setLoading(true);
        setIssues([]);

        axios.get(`${repos}/issues`)
            .then((res) => {
                setIssues(res.data);
            }).catch((error) => {
                console.log(error.message)
            }).then(() => setLoading(false));
    };

    const viewIssueArr : string[] = [];

    const deleteRepo = (e : any, repoUrl : string) => {
        e.preventDefault();

        localStorage.setItem('viewIssue', JSON.stringify(viewIssueArr));
        viewIssueArr.filter((v : string) => v !== repoUrl);
        localStorage.setItem('viewIssue', JSON.stringify(viewIssueArr));
    }

    useEffect(() => {
        fetchRepos();
    }, []);

    return (
        <div>
            { loading && <Loading /> }

            {
                issues
                ? <ul className="issues">
                    <li>
                        {
                            repos.map((repo : any, idx : number) => {
                                const [userName, repoName] = repo.split('https://api.github.com/repos/')[1].split('/');
                                return (
                                    <button
                                        key={idx}
                                        onClick={(e) => deleteRepo(e, repo)}
                                    >
                                        {userName} {repoName}
                                    </button>
                                )
                            })
                        }
                    </li>
                    {
                        Object.values(issues).map((val : issue, idx: number) => {
                            return (
                                <li
                                    className="issues__item"
                                    key={idx}
                                >
                                    <FaRegDotCircle />
                                    <div>
                                        <h3>{val.title}</h3>
                                        <p>#{val.number} by {val.user.login}</p>
                                    </div>

                                    {
                                        val.comments !== 0 &&
                                        <p className="comments"><FaRegCommentAlt/>{val.comments}</p>
                                    }
                                    <a href={val.html_url} target="_blank" rel="author"></a>
                                </li>
                            )
                        })
                    }
                </ul>
                : <p>없어!</p>
            }
        </div>
    );
}

export default Issues;