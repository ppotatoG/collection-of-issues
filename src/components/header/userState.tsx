import { useRecoilState } from "recoil";

import { addedRepository } from 'store/addedRepository';
import { RiDeleteBinFill } from 'react-icons/ri';

const UserState = () => {
    const [repos, setRepos] = useRecoilState<string[]>(addedRepository);
    return (
        <ul className="user_state">
            <li>추가된 레포지토리</li>
            {
                repos.map((repo : string) => {
                    const [userName, repoName] = repo.split('https://api.github.com/repos/')[1].split('/');
                    return (
                        <li key={`${userName}/${repoName}`}>
                            <a
                                href={`https://github.com/${userName}/${repoName}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                {userName} {repoName}
                            </a>
                            <button type="button"><RiDeleteBinFill /></button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default UserState;