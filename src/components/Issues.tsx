import React, {useState, useEffect} from "react";
import axios from 'axios';
import Loading from './loading';

import { issue } from '../types';
import { FaRegDotCircle, FaRegCommentAlt } from "react-icons/fa";

import '../styles/issues.scss';

const Issues = () => {
    const [issues, setIssues] = useState<issue[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const repos = JSON.parse(localStorage.getItem('viewIssue') || '{}');
    const getIssueUrls = repos.map((v : string) => axios.get(`${v}/issues`));

    const fetchRepos = () => {
        setLoading(true);

        axios.get(`${repos}/issues`)
            .then((res) => {
                setIssues((prevIssue : any | null) => [...prevIssue, ...res.data]);
            }).catch((error) => {
                console.log(error.message)
            }).then(() => setLoading(false));
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    return (
        <div>
            { loading && <Loading /> }

            {
                issues
                ? <ul className="issues">
                    <li>{repos}</li>
                    {
                        Object.values(issues).map((val : issue, idx: number) => {
                            return (
                                <li
                                    className="issues__item"
                                    onClick={() => window.open(val.html_url)}
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