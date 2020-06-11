import React from "react";
import spinner from "../../assets/img/Spinner.svg"
import css from "./repository-list.module.css"

const Preloader = (props) => {
    return(
        <div className={css.preloader}>
            <img src={spinner} alt=""/>
        </div>
    )
}

export default Preloader;