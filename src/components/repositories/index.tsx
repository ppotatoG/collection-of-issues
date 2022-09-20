import React, {useState} from "react";
import axios from 'axios';

interface issue {
    name: string,
    html_url: string,
    description: string,
    updated_at: string
};

const Repos = () => {
    const [repos, setRepos] = useState<issue | null>(null);

    const getIssue = async () => {
        await axios.get('https://api.github.com/search/repositories?q=TIL')
            .then((response) => {
                setRepos(response.data.items.map((val: any) => {
                    const {name, html_url, description, updated_at} = val;
                    return [name, html_url, description, updated_at];
                }))
                console.log(response.data.items);
            }).catch((error) => {
                console.log(error)
            });
    };

    console.log(repos);

    return (
        <div>
            <button onClick={getIssue}>get repobutton!</button>
            {
                repos &&
                Object.values(repos).map((val : any) => {
                    return (
                        <>
                            <p>name {val[0]}</p>
                            <p>html_url {val[1]}</p>
                            <p>description {val[2]}</p>
                            <p>updated_at {val[3]}</p>
                        </>
                    )
                })
            }
        </div>
    );
}

export default Repos;