import React, {useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import Spinner from "../component/Spinner";
import ArticlePreview from "../component/ArticlePreview";
import TextArea from "../component/TextArea";
import InputMaxLimited from "../component/InputMaxLimited";
import DropDown from "../component/DropDown";
import RadioSetEditor from "../component/RadioSetEditor";

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

function NewArticle() {
    // const {loading, error, data} = useQuery(ARTICLES_FORWARD, {variables: {first: 10}});
    //
    // if (loading) return <Spinner/>;
    // if (error) return <p>Error :( {error.toString()}</p>;

    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [languageSet, setLanguageSet] = useState(new Set(["English"]));
    const [title, setTitle] = useState("");
    const [preview, setPreview] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const onSubmit = (e) => {
        console.log(title);
    };

    return (
        <div>
            <div className="row">
                <RadioSetEditor items={languageSet} setItems={setLanguageSet}
                                selected={selectedLanguage} setSelected={setSelectedLanguage}
                                datalist={new Set(["Russian", "English"])}
                                id="radio-language-set" forbidLastItemRemoval
                />
                <InputMaxLimited className="mb-3" id="title-input" labelText="Article title" value={title}
                                 setValue={setTitle} max="0"/>
                <TextArea className="mb-3" id="preview-text-area" labelText="Preview text" rows="5" value={preview}
                          setValue={setPreview}/>
                <TextArea className="mb-3" id="body-text-area" labelText="Article body" rows="10" value={body}
                          setValue={setBody}/>
                <InputMaxLimited className="mb-3" id="tags-input" labelText="Tags"
                                 placeholder="Space separated tag names" value={tags} setValue={setTags}/>
                <DropDown className="col-md-3" items={["Public", "Unlisted", "Private"]} id="visibility-dropdown"
                          labelText="Visibility"/>
                <div className="col-12">
                    <button className="btn btn-outline-primary" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default NewArticle;