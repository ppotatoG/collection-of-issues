import {RepositoriesType} from "../../types";
import {FaLink, FaPlus} from "react-icons/fa";
import React from "react";

interface RepoCardType {
    repos : RepositoriesType[]
    viewIssueArr: string[]
}

const RepoCards = ({repos, viewIssueArr} : RepoCardType) => {
    const addRepo = (url : string) => {
        if(viewIssueArr.length >= 4) {
            alert('등록 개수는 최대 4개로 제한');
            return false;
        }

        if ((viewIssueArr.find((v : string) => v === url))) {
            alert('이미 등록된 레포지토리');
            return false;
        }

        viewIssueArr.push(url);
        localStorage.setItem('viewIssue', JSON.stringify(viewIssueArr));

        alert('추가 완료');
    };

    return (
        <ul className="repo">
            {
                repos.map((val : RepositoriesType, idx: number) => {
                    const update = new Intl.DateTimeFormat('ko').format(new Date(val.updated_at)).slice(0, -1);
                    return (
                        <li className="repo__item" key={idx}>
                            <div className="inner__text">
                                <h3>{val.name}</h3>
                                <p>{val.description}</p>
                                <p>updated_at {update}</p>
                            </div>
                            <div className="inner__status">
                                {val.open_issues !== 0 && <p>issues : {val.open_issues}</p>}
                                <button onClick={() => addRepo(val.url)}><FaPlus /></button>
                                <a href={val.html_url} target="_blank" rel="noopener noreferrer"><FaLink /></a>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
};

export default RepoCards;