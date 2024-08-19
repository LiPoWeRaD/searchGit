

export enum RepositoryType {
    FETCH_REPOSITORIES = 'FETCH_REPOSITORIES',
    FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS',
    FETCH_REPOSITORIES_ERROR = 'FETCH_REPOSITORIES_ERROR',
}



export interface Node {
    [key: string]: any
    id: number
    name: string | undefined
    forkCount: string | undefined
    updatedAt: string
    stargazers: {
        totalCount: number | undefined
    }
    primaryLanguage: {
        name: string | undefined
    }
    languages: {
        nodes: {
            name: string | undefined
        }[]
    }
    licenseInfo: {
        name: string | undefined
    }
}
export interface Edges {
    node: Node
}

interface PageInfo {
    endCursor: string
    startCursor: string
}

interface Search {
    edges: Edges[]
    pageInfo: PageInfo
    repositoryCount: number
}

interface Data {
    search: Search
}

export type Repository = {
    data: Data
}

export type RepositoriesState = {
    repositories: Repository | undefined
    loading: boolean
    error: null | string
}

export type RepositoryAction = {
    type: RepositoryType.FETCH_REPOSITORIES
} | {
    type: RepositoryType.FETCH_REPOSITORIES_SUCCESS
    payload: Repository
} | {
    type: RepositoryType.FETCH_REPOSITORIES_ERROR
    payload: string
}



