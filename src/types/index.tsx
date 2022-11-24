export interface IssuesType {
    number: number;
    html_url: string;
    title: string;
    comments: number;
    created_at: string;
    body: string;
    user: UserInfoType;
}

interface UserInfoType {
    login: string;
    avatar_url: string;
    followers_url: string;
    node_id: string;
    created_at: string;
}

export interface RepositoriesType {
    name: string;
    html_url: string;
    description: string;
    updated_at: string;
    open_issues: number;
    url: string;
}