import React from 'react';
import {gql, useQuery} from "@apollo/client";
import Spinner from "../component/Spinner";
import ArticlePreview from "../component/ArticlePreview";

const ARTICLES_FORWARD = gql`
query ArticlesFroward($first: Int!, $after: String) {
  articlesForward(first: $first, after: $after) {
    edges {
      cursor
      node {
        title
        renderedPreview
        url
        createdAt
      }
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
    }
  }
}
`;

function ArticleList() {
    const {loading, error, data} = useQuery(ARTICLES_FORWARD, {variables: {first: 10}});

    if (loading) return <Spinner/>;
    if (error) return <p>Error :( {error.toString()}</p>;

    return (
        <div className="row">
            {
                data.articlesForward.edges.map(
                    ({cursor, node}) => (
                        <ArticlePreview title={node.title} preview={node.renderedPreview} url={node.url} createdAt={node.createdAt} key={node.url}/>
                    ))
            }
        </div>
    );
}

export default ArticleList;