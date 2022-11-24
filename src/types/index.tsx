export interface IssuesType {
    number: number;
    html_url: string;
    title: string;
    user: UserObjectType;
    comments: number;
}

interface UserObjectType {
    login: string
}

export interface RepositoriesType {
    name: string;
    html_url: string;
    description: string;
    updated_at: string;
    open_issues: number;
    url: string;
}