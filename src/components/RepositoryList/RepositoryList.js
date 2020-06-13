import React from "react";
import s from "./repository-list.module.css";
import Preloader from "./Preloader";
import {NavLink} from "react-router-dom";
import ReactPaginate from 'react-paginate';

const RepositoryList = (props) => {
    let pages = [];
    let totalPages = Math.ceil(props.totalRepositories / props.pageSize);//рассчитываем количество страниц с репозиториями

    const onUpdateSearchText = (e) => {
        props.setSearchText(e.target.value);
    };
    const onButtonClick = (e) => {
        props.setCurrentPage(1);
        props.getRepositories(10, 1, props.searchText)

    };

    return (
        <div className={s.componentContainer}>
            <div className={s.searchContainer}>
                <input onChange={onUpdateSearchText} value={props.searchText} placeholder={"Enter search text"}></input>
                <button onClick={onButtonClick}>Search</button>
            </div>

            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={totalPages}
                onPageChange={(data) => {
                    props.onPageNumClick(data.selected + 1);
                }}
                //forcePage={props.currentPage}
                containerClassName={s.pagination}
                marginPagesDisplayed={0}
                pageRangeDisplayed={4}
                subContainerClassName={s.pagination + "" + s.pages}
                breakLabel={"..."}
                disableInitialCallback={true}
                activeClassName={s.active}
                forcePage={props.currentPage - 1}
            />


            <div className={s.repoContainer}>
                {

                    props.isFetching ? <Preloader/> :
                        props.repositories.map(
                            (repo) => {
                                return (<NavLink to={"/repository/" + repo.id} className={s.navlink}>
                                    <div className={s.repo}>
                                        <span><b>Name: </b>{repo.name}</span>
                                        <span><b>Stars: </b>{repo.stargazers_count}</span>
                                        <span><b>Last update: </b>{repo.updated_at.replace('Z', '').replace('T', ' ')}</span>
                                        <span><b>Link: </b><a href={repo.html_url}>{repo.html_url}</a></span>
                                    </div>
                                </NavLink>)
                            }
                        )
                }
            </div>
        </div>
    )
}

export default RepositoryList;