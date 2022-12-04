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
    return (
        <ul className="issues">
            {
                issues.map((val: IssuesType) => {
                    const {id, title, number, comments, body, created_at, html_url} = val;
                    const {avatar_url, login} = val.user;

                    const userHtmlUrl = val.user.html_url;
                    const created = new Intl.DateTimeFormat('ko').format(new Date(created_at));
                    const [, repoName] = html_url.split('https://github.com/')[1].split('/');

                    return (
                        <li
                            className="issues__item"
                            key={id}
                        >
                            <div className="repo_info">
                                <div className="title">
                                    <p>{repoName} #{number}</p>
                                    <ReactMarkdown
                                        className="markdown-body"
                                        children={title}
                                        remarkPlugins={[remarkGfm]}
                                    />
                                </div>
                                <a href={val.html_url} target="_blank" rel="noopener noreferrer">이슈 바로가기</a>
                                {
                                    body.replace(/ /, '') !== '' &&
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
                                    <p>by</p>
                                    <b>{login}</b>
                                    <a href={userHtmlUrl} target="_blank" rel="noopener noreferrer">레포지토리 바로가기</a>
                                </div>
                                {
                                    comments !== 0 &&
                                    <p className="comments"><FaRegCommentAlt/>{comments}</p>
                                }
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
};

export default contents;