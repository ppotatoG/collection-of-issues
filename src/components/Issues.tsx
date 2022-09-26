import React, {useState, useEffect} from "react";
import axios from 'axios';
import Loading from 'components/loading';

import { issue } from 'types';
import { FaRegDotCircle, FaRegCommentAlt, FaTimes } from "react-icons/fa";

import 'styles/issues.scss';

const Issues = () => {
    const [issues, setIssues] = useState<any>([]);
    const [repos, setRepos] = useState<string[]>(JSON.parse(localStorage.getItem('viewIssue') || '{}'));
    const [loading, setLoading] = useState<boolean>(false);

    const fetchIssues = () => {
        if (repos) {
            setLoading(true);
            setIssues([]);

            const getIssueUrls = repos.map((v : string) => axios.get(`${v}/issues`));

            axios.all([...getIssueUrls])
                .then(axios.spread((res : any) => {
                    [res].forEach(item => {
                        setIssues((prevIssue : any | null) => [...prevIssue, ...item.data]);
                    })

                })).catch(e => {
                    console.log(e);
                }).then(() => setLoading(false));
        }
    };

    const deleteRepo = (e : any, repoUrl : string) => {
        const repoName = repoUrl.split('https://api.github.com/repos/')[1].split('/')[0];
        e.preventDefault();

        alert(`delete ${repoName}`);

        setRepos(repos.filter((v : string) => v !== repoUrl));
        localStorage.setItem('viewIssue', JSON.stringify(repos));

        fetchIssues();
    }

    const ViewIssues = () : JSX.Element | any => {
        if (issues.length && repos.length) {
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
        } else {
            return(
                <h3
                    style={{
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100vh',
                        fontSize: '30px'
                    }}
                >
                    not issues
                    <a
                        href="./search"
                        rel="noreferrer"
                        style={{textDecoration: 'underline'}}
                    >
                        search
                    </a>
                </h3>
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