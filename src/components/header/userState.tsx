import React from 'react';
import { useRecoilState } from 'recoil';
import { RiDeleteBinFill } from 'react-icons/ri';
import { addedRepository } from 'store/addedRepository';

const UserState = () => {
  const [repos, setRepos] = useRecoilState<string[]>(addedRepository);

  const deleteRepos = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, repo: string) => {
    e.preventDefault();
    setRepos((prev) => prev.filter((v) => v !== repo));
  };

  return (
    <ul className="user_state">
      <li>추가된 레포지토리</li>
      {repos.map((repo: string) => {
        const [userName, repoName] = repo.split('https://api.github.com/repos/')[1].split('/');
        return (
          <li key={`${userName}/${repoName}`}>
            <a
              href={`https://github.com/${userName}/${repoName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userName} {repoName}
            </a>
            <button type="button" onClick={(e) => deleteRepos(e, repo)}>
              <RiDeleteBinFill />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default UserState;
