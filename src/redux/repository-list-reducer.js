import {repositoryApi} from "../api/api";

let initialState = {
    repositories: [],
    currentPage: 1,
    pageSize: 10,//потому что будем показывать 10 репозиториев
    totalRepositories: 0,
    isFetching: false,
};

const repositoryListReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET-REPOS': {
            return {
                ...state,
                repositories: [...action.repositories]
            }
        }
        case 'SET-CURRENT-PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SET-TOTAL-REPOS': {
            return {
                ...state,
                totalRepositories: action.totalRepositories
            }
        }
        case 'SET-PAGE-SIZE': {
            return {
                ...state,
                pageSize: action.pageSize
            }
        }

        case 'SET-IS-FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        default:
            return state;

    }
}

//action-creators
export const setRepositories = (repositories) => ({type: 'SET-REPOS', repositories});
export const setTotalRepositories = (totalRepositories) => ({type: 'SET-TOTAL-REPOS', totalRepositories});
export const setCurrentPage = (currentPage) => ({type: 'SET-CURRENT-PAGE', currentPage});
export const setFetching = (isFetching) => ({type: 'SET-IS-FETCHING', isFetching});

//thunk-creators
export const getRepositories = (pageSize, currentPage) => {
    return (dispatch) => {
        dispatch(setFetching(true));
        dispatch(setCurrentPage(currentPage));
        repositoryApi.getRepositories(pageSize, currentPage).then(response => {
            dispatch(setFetching(false));
            dispatch(setRepositories(response.items));//это надо будет как-то упростить, чтобы каждый элемент массива содержал только 4 свойства.
            //упрощать скорее всего с помощью map или reduce
            dispatch(setTotalRepositories(response.total_count));
        })
    }
}


export default repositoryListReducer;
