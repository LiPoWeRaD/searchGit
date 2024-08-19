import { RepositoriesState, RepositoryAction, RepositoryType } from "../../types/repositoryTypes"


// используем для хранения репозиториев
const initialState: RepositoriesState = {
    repositories: undefined,
    loading: false,
    error: null
}

// reducer
export const fetchRepositoriesReducer = (state = initialState, action: RepositoryAction): RepositoriesState => {
    switch (action.type) {
        case RepositoryType.FETCH_REPOSITORIES:
            return {
                ...state,
                loading: true
            }
        case RepositoryType.FETCH_REPOSITORIES_SUCCESS:
            return {
                ...state,
                repositories: action.payload,
                loading: false
            }
        case RepositoryType.FETCH_REPOSITORIES_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}