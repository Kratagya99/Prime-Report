import React, { Component } from "react";

export class NewsItem extends Component {

  render() {
    let {title,description,imgURL,newsURL}=this.props;
    return (
      <div>
        <div className="card my-3" style={{ width: "18rem" }}>
          <img src={imgURL} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "cover" }} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <a href={newsURL} target="_blank"className="btn btn-dark">
              Read
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
