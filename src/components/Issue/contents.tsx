import React from "react";
import 'github-markdown-css';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {FaRegCommentAlt} from "react-icons/fa";
import {IssuesType} from "types";

interface ContentsPropType {
    repos: string[]
    issues: IssuesType[]
    setRepos: any
}

const contents = ({repos, setRepos, issues}: ContentsPropType) => {
    const deleteRepo = (e: React.MouseEvent<HTMLButtonElement>, repoUrl: string) => {
        const repoName = repoUrl.split('https://api.github.com/repos/')[1].split('/')[0];
        e.preventDefault();

        alert(`delete ${repoName}`);
        setRepos((prev: any[]) => prev.filter((v: string) => v !== repoUrl));
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

                    const userHtmlUrl = val.user.html_url;
                    const created = new Intl.DateTimeFormat('ko').format(new Date(created_at));
                    const [, repoName] = html_url.split('https://github.com/')[1].split('/');
                        console.log()
                    return (
                        <li
                            className="issues__item"
                            key={node_id}
                        >
                            <div className="repo_info">
                                <div className="title">
                                    <p><b>{repoName} #{number}</b></p>
                                    {/*{title}*/}
                                    <ReactMarkdown
                                        className="markdown-body"
                                        children={title}
                                       remarkPlugins={[remarkGfm]}
                                    />
                                </div>
                                {
                                    body &&
                                    <ReactMarkdown
                                        className="markdown-body body"
                                        children={body}
                                       remarkPlugins={[remarkGfm]}
                                    />
                                }
                                <p>created_at {created}</p>
                            </div>

                            <div className="user_info">
                                <div>
                                    <figure><img src={avatar_url} alt={`${login} 프로필 이미지`}/></figure>
                                    <p>by <b>{login}</b></p>
                                    <a href={userHtmlUrl} target="_blank" rel="noopener noreferrer">레포지토리 바로가기</a>
                                </div>
                                {
                                    comments !== 0 &&
                                    <p className="comments"><FaRegCommentAlt/>{comments}</p>
                                }
                            </div>

                            <a href={val.html_url} target="_blank" rel="noopener noreferrer">레포지토리 바로가기</a>
                        </li>
                    )
                })
            }
        </ul>
    )
};

export default contents;