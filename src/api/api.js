import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://api.github.com/",
});

export const repositoryApi = {
    //дефолтные параметры будут заменены при запросе.
    getRepositories(pageSize = 10, currentPage = 1, queryParameters = "tetris+language:assembly") {
        return instance.get(`search/repositories?page=${currentPage}&per_page=${pageSize}&q=${queryParameters}&sort=stars&order=desc`)
            .then(response => {
                return response.data;
            })
    },

}


//тестовый запрос https://api.github.com/search/repositories?page=1&per_page=10&q=tetris+language:assembly&sort=stars&order=desc
