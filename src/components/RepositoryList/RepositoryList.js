import React from "react";
import s from "./repository-list.module.css";
import Preloader from "./Preloader";

const RepositoryList = (props) => {
    let pages = [];
    let totalPages = Math.ceil(props.totalRepositories / props.pageSize);//рассчитываем количество страниц с репозиториями

    //создаем массив для списка страниц.
    for (let i = props.currentPage; i <= props.currentPage + 4; i++) {
        pages.push(i);
    }

    //в стейт надо добавить инпут, как-то надо брать из инпута значение когда мы кликаем на кнопку.
    return (
        <div>
            <div>
                <button onClick={props.getRepositories}>Search</button>
            </div>

            <div>
                {
                    !props.totalRepositories ? undefined : <div>{
                        pages.map((pageNum) => {
                            return <span
                                className={pageNum === props.currentPage ? s.currentPage : '' + ' ' + s.pageNumber}
                                onClick={(event) => {
                                    props.onPageNumClick(pageNum)
                                }}>{pageNum}</span>
                        })

                    }
                        ... {totalPages}
                    </div>

                }

            </div>

            {
                props.isFetching? <Preloader/> :
                props.repositories.map(
                    (repo) => {
                        return <div>
                            <span>Name: {repo.name}</span>
                            <span>Stars: {repo.stargazers_count}</span>
                            <span>Last update: {repo.updated_at}</span>
                            <span>Link: {repo.html_url}</span>
                        </div>
                    }
                )
            }
        </div>
    )
}

export default RepositoryList;