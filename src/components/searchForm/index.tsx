import React, {useState} from "react";
import axios from 'axios';
import Loading from '../loading';
import '../../styles/repos.scss';

interface Repositories {
    name: string,
    html_url: string,
    description: string,
    updated_at: string
};

const SearchForm = () => {
    const [searchText, setSearchText] = useState<string | ''>('');
    const [repos, setRepos] = useState<Repositories | null>(null);
    const [error, setError] = useState<object | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const SearchRepos = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchRepos()
        console.log(searchText);
    }

    const fetchRepos = async () => {
        console.log('fetchRepos')
        setLoading(true);
        await axios.get(`https://api.github.com/search/repositories?q=${searchText}`)
            .then((response) => {
                // TODO : then 정리
                setRepos(null);
                setError(null);

                setRepos(response.data.items.map((val: Repositories) => {
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

    if (error) return <div>에러가 발생했습니다</div>;

    return (
        <>
            <form action="submit" onSubmit={SearchRepos}>
                <label htmlFor="">
                    <input
                        type="text"
                        placeholder="placeholder"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <button>돋보기 아이콘</button>
                </label>
            </form>

            { loading && <Loading /> }

            {
                repos &&
                <ul className="repo">
                    {
                        Object.values(repos).map((val : Repositories, idx: number) => {
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
        </>
    )
}

export default SearchForm;