import {FaRegCommentAlt, FaRegDotCircle, FaTimes} from "react-icons/fa";
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
            <li className="issues__item">
                {
                    repos.map((repo: string, idx: number) => {
                        const [userName, repoName] = repo.split('https://api.github.com/repos/')[1].split('/');
                        return (
                            <button
                                key={idx}
                                onClick={(e) => deleteRepo(e, repo)}
                            >
                                {repoName} By.{userName}
                                <FaTimes/>
                            </button>
                        )
                    })
                }
            </li>
            {
                issues.map((val: IssuesType, idx: number) => {
                    const [, repoName] = val.html_url.split('https://github.com/')[1].split('/');
                    return (
                        <li
                            className="issues__item"
                            key={idx}
                        >
                            <FaRegDotCircle/>
                            <div>
                                <h3>{val.title}</h3>
                                <p>#{val.number} by {val.user.login} in <b>{repoName}</b></p>
                            </div>

                            {
                                val.comments !== 0 &&
                                <p className="comments"><FaRegCommentAlt/>{val.comments}</p>
                            }
                            <a href={val.html_url} target="_blank" rel="noopener noreferrer">레포지토리 바로가기</a>
                        </li>
                    )
                })
            }
        </ul>
    )
};

export default contents;