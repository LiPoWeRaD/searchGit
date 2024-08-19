import { Dispatch } from "redux";
import axios from 'axios'
import { RepositoryAction, RepositoryType } from "../../types/repositoryTypes";
import { API_URL, token } from "../../api/API_URL";

// axios для запроса
const API = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `token ${token}`,
        "content-type": "application/json",
    }
})
// параметры запроса поиска по имени
const query = (title: string) => `
    query {
      search(query: "title: ${title}, is:public", type: REPOSITORY, first: 50) {
        repositoryCount
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            ... on Repository {
              id
              name
              forkCount
              updatedAt
              stargazers {
                totalCount
              }
              languages(first: 5) {
                nodes {
                  name
                }
              }
              primaryLanguage {
                name
              }
              licenseInfo {
                name
              }
            }
          }
        }
      }
    }
      `;

// получение репозиториев
export const fetchGetRepositories = (title: string) => {
    return async (dispatch: Dispatch<RepositoryAction>) => {
        dispatch({ type: RepositoryType.FETCH_REPOSITORIES });
        await API.post('https://api.github.com/graphql', { query: query(title) }, {
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `token ${token}`,
            }
        })
            .then((response) => {
                dispatch({ type: RepositoryType.FETCH_REPOSITORIES_SUCCESS, payload: response.data })                
            })
            .catch((error) => {
                dispatch({ type: RepositoryType.FETCH_REPOSITORIES_ERROR, payload: error.message })
            })
    }
}


