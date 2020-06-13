import React, {useEffect, useState} from 'react'
import Preloader from "../RepositoryList/Preloader";
import * as axios from "axios";
import s from "./repository-card.module.css"
import image from "../../assets/img/Spinner.svg"
const RepositoryCard = (props) => {

    const [repository, setRepository] = useState(undefined);
    const [languages, setLanguages] = useState(undefined);
    const [contributors, setContributors] = useState(undefined);

    const [isFetching, setIsFetching] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        setRepository(props.getRepositoryById(props.match.params.repoId));
    }, []);

    useEffect(() => {
        getLanguages();
    }, [repository]);

    const getAvatar = () => {
        if (!repository) return;
        return repository.owner.avatar_url;
    };
    const getLanguages = () => {
        if (!repository) return;
        axios.get(repository.languages_url).then((response) => {
                setIsFetching(true);
                if (Object.keys(response.data).length === 0 && response.data.constructor === Object) {
                    setLanguages("No languages were used");
                } else {
                    setLanguages(Object.keys(response.data).join(" "));
                }
                getContributors();
                return response.data;
            }
        ).catch((error) => {
                console.log(error.message);
                setLanguages("Could not get languages from the api");

            }
        );
    };
    const getContributors = () => {
        if (!repository) return;
        return axios.get(repository.contributors_url).then((response) => {
            if (response.data.length === 0) {
                setContributors("No contributors were found");
            } else {
                setContributors(response.data.slice(0, 10).reduce((a, b) => a + (b["login"] + " "), ""));
            }
            setIsFetching(false);
            return response;
        }).catch((error) => {
            console.log(error.message);
            setContributors("Could not get contributors from the api")

        });
    };

    return (
        <div className={s.repositoryCardComponentContainer}>
            {!repository || isFetching ? <Preloader/> :
                <div className={s.repositoryCardContainer}>
                    <div className={s.repoCard}>
                        <h2>Repository:</h2>
                        <div><b>Name: </b>{repository.name}</div>
                        <div><b>Description: </b>{repository.description}</div>
                        <div><b>Star count: </b>{repository.stargazers_count}</div>
                        <div><b>Last updated at: </b>{repository.updated_at}</div>
                        <div><b>Languages: </b>{languages}</div>
                        <div><b>Contributors: </b>{contributors}</div>
                    </div>
                    <div className={s.repoCard}>
                        <h2>Owner:</h2>
                        <div><img src={imageLoaded? getAvatar(): image} className={s.image} onLoad={() => {
                            setImageLoaded(true);
                        }}/></div>
                        <div><b>Login: </b>{repository.owner.login}</div>
                        <div><b>Owner url: </b><a href={repository.owner.html_url}>{repository.owner.url}</a></div>
                    </div>

                </div>


            }

        </div>
    )
}

export default RepositoryCard;