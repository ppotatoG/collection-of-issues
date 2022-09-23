import React, {useState, useEffect} from "react";
import axios from 'axios';
import Loading from './loading';

import { issue } from '../types';
import { FaRegDotCircle, FaRegCommentAlt } from "react-icons/fa";

import '../styles/issues.scss';

const Issues = () => {
    const [issues, setIssues] = useState<issue | null>(null);
    const [error, setError] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRepos = async () => {
        setLoading(true);

        await axios.get('https://api.github.com/repos/michalsnik/aos/issues')
            .then((response) => {
                // TODO : then 정리
                setIssues(null);
                setError(null);

                setIssues(response.data.map((val: issue) => {
                    const {number, html_url, title, user, comments} = val;
                    return {
                        number: number,
                        html_url: html_url,
                        title : title,
                        user : user.login,
                        comments : comments
                    };
                }))
            }).catch((error) => {
                alert(error.message)
            });

        setLoading(false);
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    return (
        <div>
            { loading && <Loading /> }

            {
                issues &&
                <ul className="issues">
                    {
                        Object.values(issues).map((val : issue, idx: number) => {
                            return (
                                <li
                                    className="issues__item"
                                    onClick={e => window.open(val.html_url)}
                                    key={idx}
                                >
                                    <FaRegDotCircle />
                                    <div>
                                        <h3>{val.title}</h3>
                                        <p>#{val.number} by {val.user}</p>
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
            }
        </div>
    );
}

export default Issues;