import React, {useEffect, useState} from 'react'
import Preloader from "../RepositoryList/Preloader";
import * as axios from "axios";


const RepositoryCard = (props) => {

    //Здесь используется локальный стейт, потому что нам не нужны эти данные в глобальном и в компоненте списка репозиториев.
    const [repository, setRepository] = useState(undefined);
    const [languages, setLanguages] = useState(undefined);
    const [contributors, setContributors] = useState(undefined);

    useEffect(() => {
        setRepository(props.getRepositoryById(props.match.params.repoId));
        getLanguages();
        getContributors();
    });


    const getAvatar = () => {
        if (!repository) return;
        return repository.owner.avatar_url;
    }
    const getLanguages = () => {
        if (!repository) return;
        //debugger;
        axios.get(repository.languages_url).then((response) => {
            // debugger;
            // console.log(response.data);
            if (Object.keys(response.data).length === 0 && response.data.constructor === Object){
                setLanguages("No languages were used");
            } else{
                setLanguages(Object.keys(response.data).join(" "));
            }
        });
    }
    const getContributors = () => {
        if (!repository) return;
        //debugger;
        axios.get(repository.contributors_url).then((response) => {
            // debugger;
            // console.log(response.data);
            if (Object.keys(response.data).length === 0 && response.data.constructor === Object){
                setContributors("No contributors were found");
            } else{
                //здесь надо пройтись по массиву объектов и выбрать login у каждого контрибьютора и добавить его в строку.
                //debugger;
                setContributors(response.data.slice(0, 10).reduce((a, b) => a + (b["login"] + " "), ""));
            }
        });
    }

    return (
        <div>
            {!repository ? <Preloader/> :
                <div>
                    Repository:
                    <div>Name: {repository.name}</div>
                    <div>Description: {repository.description}</div>
                    <div>Star count: {repository.stargazers_count}</div>
                    <div>Last updated at: {repository.updated_at}</div>
                    <div>Languages: {languages}</div>
                    <div>Contributors: {contributors}</div>

                    Owner:
                    <div><img src={getAvatar()} alt=""/></div>
                    <div>Login: { repository.owner.login}</div>
                    <div>Owner url: <a href={repository.owner.html_url}>{repository.owner.url}</a></div>
                </div>


            }

        </div>
    )
}

export default RepositoryCard;