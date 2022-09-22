import React, {useState, useEffect} from "react";
import axios from 'axios';
import Loading from './loading';

import { issue } from '../types';

import '../styles/repos.scss';

const Issues = () => {
    const [issues, setIssues] = useState<issue | null>(null);
    const [error, setError] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRepos = async () => {
        await axios.get('https://api.github.com/repos/michalsnik/aos/issues')
            .then((response) => {
                console.log(response.data)
                // TODO : then 정리
                setIssues(null);
                setError(null);

                setLoading(true);

                setIssues(response.data.map((val: issue) => {
                    console.log(val)
                    const {number, html_url, title, user} = val;
                    return {
                        number: number,
                        html_url: html_url,
                        title : title,
                        user : user.login
                    };
                }))

                console.log(issues)

                setLoading(false);
            }).catch((error) => {
                alert(error.message)
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!issues) return null;

    return (
        <div>
            {
                issues &&
                <ul className="repo">
                    {
                        Object.values(issues).map((val : issue, idx: number) => {
                            return (
                                <li className="repo__item" onClick={e => window.open(val.html_url)}>
                                    <div>
                                        <p>{val.number}</p>
                                        <p>{val.html_url}</p>
                                        <p>{val.title}</p>
                                        <p>{val.user}</p>
                                        <button>해당 레포 추가</button>
                                        <button>레포 보러가기</button>
                                        <button>이슈 개수</button>
                                    </div>
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