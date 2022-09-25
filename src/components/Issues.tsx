import React, {useState, useEffect} from "react";
import axios from 'axios';
import Loading from 'components/loading';

import { issue } from 'types';
import { FaRegDotCircle, FaRegCommentAlt, FaTimes } from "react-icons/fa";

import 'styles/issues.scss';

const Issues = () => {
    const [issues, setIssues] = useState<issue[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const repos = JSON.parse(localStorage.getItem('viewIssue') || '{}');
    const getIssueUrls = repos.map((v : string) => axios.get(`${v}/issues`));

    const fetchIssues = () => {
        setLoading(true);
        setIssues([]);

        axios.all([...getIssueUrls])
            .then(axios.spread((res : any) => {
                [res].forEach(item => {
                    console.log(item);
                    setIssues((prevIssue : any | null) => [...prevIssue, ...item.data]);
                })

            })).catch(e => {
                console.log(e);
            }).then(() => setLoading(false));
    };

    const deleteRepo = (e : any, repoUrl : string) => {
        e.preventDefault();

        repos.filter((v : string) => v !== repoUrl);
        localStorage.setItem('viewIssue', JSON.stringify(repos));
    }

    const ViewIssues = () : JSX.Element | any => {
        console.log(issues)
        if (issues) {
            return (
                <ul className="issues">
                    <li className="issues__item">
                        {
                            repos.map((repo : any, idx : number) => {
                                const [userName, repoName] = repo.split('https://api.github.com/repos/')[1].split('/');
                                return (
                                    <button
                                        key={idx}
                                        onClick={(e) => deleteRepo(e, repo)}
                                    >
                                        {repoName} By.{userName}
                                        <FaTimes />
                                    </button>
                                )
                            })
                        }
                    </li>
                    {
                        issues.map((val : issue, idx: number) => {
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
            )
        }
    }

    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <div>
            { loading && <Loading /> }
            <ViewIssues />
        </div>
    );
}

export default Issues;