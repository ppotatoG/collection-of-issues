import React, {useState, useEffect} from "react";
import axios from 'axios';

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
                console.log(loading)

                setRepos(response.data.items.map((val: issue) => {
                    const {name, html_url, description, updated_at} = val;
                    return {
                        name: name,
                        html_url: html_url,
                        description : description,
                        updated_at : updated_at
                    };
                }))

                setLoading(false);
                console.log(loading)
            }).catch((error) => {
                console.log(error)
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!repos) return null;

    return (
        <div>
            <button onClick={fetchRepos}>get repobutton!</button>
            {
                repos &&
                Object.values(repos).map((val : issue, idx: number) => {
                    return (
                        <ul>
                            <li key={idx}>
                                <p key={val.name}>name {val.name}</p>
                                <p key={val.html_url}>html_url {val.html_url}</p>
                                <p key={val.description}>description {val.description}</p>
                                <p key={val.updated_at}>updated_at {val.updated_at}</p>
                            </li>
                        </ul>
                    )
                })
            }
        </div>
    );
}

export default Repos;