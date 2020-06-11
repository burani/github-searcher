import {
    getRepositories,
    setCurrentPage,
    setSearchText
} from "../../redux/repository-list-reducer";

import RepositoryList from "./RepositoryList";
import React from "react";
import Preloader from "./Preloader";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        repositories: state.repositoryList.repositories,
        currentPage: state.repositoryList.currentPage,
        totalRepositories: state.repositoryList.totalRepositories,
        pageSize: state.repositoryList.pageSize,
        isFetching: state.repositoryList.isFetching,
        searchText: state.repositoryList.searchText
    }
}


class RepositoryListContainer extends React.Component {

    // componentDidMount() {
    //     this.props.getRepositories(this.props.pageSize, 1);
    // }

    //сюда еще будут приходить опции для поиска от пользователя
    onPageNumClick = (pageNum) => {
        this.props.getRepositories(this.props.pageSize, pageNum, this.props.searchText)
    }


    render() {
        return <RepositoryList totalRepositories={this.props.totalRepositories} repositories={this.props.repositories}
            onPageNumClick={this.onPageNumClick} pageSize={this.props.pageSize} currentPage={this.props.currentPage}
        isFetching={this.props.isFetching} setSearchText={this.props.setSearchText} getRepositories={this.props.getRepositories}
        setCurrentPage={this.props.setCurrentPage} searchText={this.props.searchText}/>
    }
}

export default connect(mapStateToProps, {getRepositories, setCurrentPage, setSearchText})(RepositoryListContainer)