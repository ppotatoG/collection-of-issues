import {FaRegCommentAlt} from "react-icons/fa";
import {IssuesType} from "types";
import React from "react";

interface ContentsPropType {
    repos: string[]
    issues: IssuesType[]
    setRepos: any
}

const contents = ({repos, setRepos, issues} : ContentsPropType) => {
    const deleteRepo = (e: React.MouseEvent<HTMLButtonElement>, repoUrl: string) => {
        const repoName = repoUrl.split('https://api.github.com/repos/')[1].split('/')[0];
        e.preventDefault();

        alert(`delete ${repoName}`);
        setRepos((prev : any[])=> prev.filter((v: string) => v !== repoUrl));
    }

    return (
        <ul className="issues">
            {/*<li className="issues__item">*/}
            {/*    {*/}
            {/*        repos.map((repo: string, idx: number) => {*/}
            {/*            const [userName, repoName] = repo.split('https://api.github.com/repos/')[1].split('/');*/}
            {/*            return (*/}
            {/*                <button*/}
            {/*                    key={idx}*/}
            {/*                    onClick={(e) => deleteRepo(e, repo)}*/}
            {/*                >*/}
            {/*                    {repoName} By.{userName}*/}
            {/*                    <FaTimes/>*/}
            {/*                </button>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</li>*/}
            {
                issues.map((val: IssuesType) => {
                    console.log(val)
                    const {title, number, comments, body, created_at, html_url} = val;
                    const {node_id, avatar_url, login} = val.user;

                    const created = new Intl.DateTimeFormat('ko').format(new Date(created_at));
                    const [, repoName] = html_url.split('https://github.com/')[1].split('/');

                    return (
                        <li
                            className="issues__item"
                            key={node_id}
                        >
                            <div className="repo_info">
                                <p><b>{repoName} #{number}</b></p>
                                <h3>{title}</h3>
                                <p className="body">{body}</p>
                                <p>created_at {created}</p>
                            </div>

                            <div className="user_info">
                                <div>
                                    <figure><img src={avatar_url} alt={`${login} 프로필 이미지`}/></figure>
                                    <p>by <b>{login}</b></p>
                                </div>
                                {
                                    comments !== 0 &&
                                    <p className="comments"><FaRegCommentAlt/>{comments}</p>
                                }
                            </div>

                            {/*<a href={val.html_url} target="_blank" rel="noopener noreferrer">레포지토리 바로가기</a>*/}
                        </li>
                    )
                })
            }
        </ul>
    )
};

export default contents;