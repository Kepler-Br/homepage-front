import React from 'react';
import {ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery} from "@apollo/client";
import Navbar from "./component/Navbar";
import Spinner from "./component/Spinner";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ArticleList from "./page/ArticleList";
import NewArticle from "./page/NewArticle";

const client = new ApolloClient({
    uri: 'http://127.0.0.1:8080/graphql',
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route path={"/new-article"}>
                            <NewArticle/>
                        </Route>
                        <Route path="/">
                            <ArticleList/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;