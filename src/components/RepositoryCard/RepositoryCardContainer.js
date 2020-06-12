import React from "react";
import RepositoryCard from "./RepositoryCard"

import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        repositories: state.repositoryList.repositories,
    }
}


class RepositoryCardContainer extends React.Component {



    getRepositoryById = (userId) => {
        return this.props.repositories.find((repo) => repo.id === parseInt(userId));
    };




    render() {
        return (<RepositoryCard {...this.props} getRepositoryById={this.getRepositoryById}/>)
    }
}

export default compose(
    connect(mapStateToProps, null),
    withRouter
)(RepositoryCardContainer)

