export interface issue {
    number: number,
    html_url: string,
    title: string,
    user: string | any
    comments: number
};

export interface Repositories {
    name: string,
    html_url: string,
    description: string,
    updated_at: string
    open_issues: number
};