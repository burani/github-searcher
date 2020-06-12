import React from 'react';
import './App.css';
import RepositoryListContainer from "./components/RepositoryList/RepositoryListContainer";
import {Route} from "react-router-dom";
import RepositoryCardContainer from "./components/RepositoryCard/RepositoryCardContainer";


function App() {
    return (
        <div className="App">
            <Route exact path='/' render={() => <RepositoryListContainer/>}/>
            <Route path='/repository/:repoId?' render={() => <RepositoryCardContainer/>}/>
            <div className="app-wrapper">


            </div>

        </div>

    );
}

export default App;
