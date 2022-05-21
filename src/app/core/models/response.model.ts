export interface ApiResponse {
    total_count: number,
    incomplete_results: boolean,
    items: Item [],
}

export interface Item {
    login?: string,
    avatar_url?: string,
    url?: string,
    userDetails: UserDetails
}

export interface UserDetails {
    url: string;
    avatar_url: string
    name: string,
    company: string,
    followers: number,
    following: number,
}