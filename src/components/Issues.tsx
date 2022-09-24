import React, {useState, useEffect} from "react";
import axios from 'axios';
import Loading from './loading';

import { issue } from '../types';
import { FaRegDotCircle, FaRegCommentAlt } from "react-icons/fa";

import '../styles/issues.scss';

const Issues = () => {
    const [issues, setIssues] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(true);

    const repos = JSON.parse(localStorage.getItem('viewIssue') || '{}');
    const getIssueUrls = repos.map((v : string) => axios.get(`${v}/issues`));

    const fetchRepos = () => {
        setLoading(true);

        axios.all([...getIssueUrls])
            .then(axios.spread((...res) => {
                    console.log(res)
                res.forEach((item : any) => {
                    // setIssues(res.data.map((val: issue) => {
                    //     const {number, html_url, title, user, comments} = val;
                    //     return {
                    //         number: number,
                    //         html_url: html_url,
                    //         title : title,
                    //         user : user.login,
                    //         comments : comments
                    //     };
                    // }))

                    console.log(item)
                })
            })).catch(e => {
                console.log(e);
            })

        setLoading(false);
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
                    {
                        Object.values(issues).map((val : any, idx: number) => {
                            return (
                                <li
                                    className="issues__item"
                                    onClick={() => window.open(val.html_url)}
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
                : <p>없어!</p>
            }
        </div>
    );
}

export default Issues;