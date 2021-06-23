import React from 'react';
import moment from "moment";
import 'moment/locale/ru'
import 'moment/locale/en-gb'

function getDateString(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const sameDayNumber = date.getUTCDay() === now.getUTCDay();
    const sameYearNumber = date.getUTCFullYear() === now.getUTCFullYear();
    const dateMoment = moment(date);

    if ((sameYearNumber) && (sameDayNumber)) {
        return dateMoment.fromNow();
    }
    if (sameYearNumber) {
        return dateMoment.format("MMMM D[,] LT")
    }
    return dateMoment.format("LLL")
}

function ArticlePreview(props) {
    return (
        <div className="col-sm-6">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.preview}</p>
                    <a href={props.url} className="btn btn-primary">Read full →</a>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{getDateString(props.createdAt)}</small>
                </div>
            </div>
        </div>
    );
}

export default ArticlePreview;