import React, {useState, useEffect} from "react";
import axios from 'axios';
import Loading from '../loading';
import '../../styles/repos.scss';

interface issue {
    name: string,
    html_url: string,
    description: string,
    updated_at: string
};

const Repos = () => {
    const [repos, setRepos] = useState<issue | null>(null);
    const [error, setError] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRepos = async () => {
        await axios.get('https://api.github.com/search/repositories?q=TIL')
            .then((response) => {
                // TODO : then 정리
                setRepos(null);
                setError(null);

                setLoading(true);

                setRepos(response.data.items.map((val: issue) => {
                    console.log(val)
                    const {name, html_url, description, updated_at} = val;
                    return {
                        name: name,
                        html_url: html_url,
                        description : description,
                        updated_at : updated_at
                    };
                }))

                setLoading(false);
            }).catch((error) => {
                console.log(error)
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!repos) return null;

    return (
        <div>
            {
                repos &&
                <ul className="repo">
                    {
                        Object.values(repos).map((val : issue, idx: number) => {
                            return (
                                <li className="repo__item" onClick={e => window.open(val.html_url)}>
                                    <p>{val.name}</p>
                                    <p>{val.description}</p>
                                    <p>updated_at {val.updated_at}</p>
                                    <div>
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

export default Repos;