import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      buffering: false,
      page: 1,
      totalResults: 0
    };

  }

  // Helper function to capitalize the first letter for the title
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async componentDidMount() {
    this.fetchNews(this.state.page);
  }

  fetchNews = async (page) => {
    const { country, category } = this.props;
    // Note: The correct endpoint for top headlines with country and category is this one.
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page}&pageSize=20`;
    
    this.setState({ buffering: true });
    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      const filteredArticles = parsedData.articles
        ? parsedData.articles.filter(
            (article) => article.source.name !== "Google News (India)" && article.urlToImage
          )
        : [];

      this.setState({
        articles: filteredArticles,
        totalResults: parsedData.totalResults || 0,
        page: page,
        buffering: false
      });
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.setState({ buffering: false });
    }
  };

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  };

  handleNextClick = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)) {
      this.fetchNews(this.state.page + 1);
    }
  };

  render() {
    const { country, category } = this.props;
    const countryName = {
      us: 'USA',
      in: 'India',
      gb: 'UK',
      au: 'Australia'
    };

    return (
      <div>
        <h2 className='text-center my-4'>
          Top {this.capitalizeFirstLetter(category)} Headlines from {countryName[country]}
        </h2>

        {this.state.buffering ? (
          <Loading />
        ) : (
          <div className='container my-3'>
            <div className='row'>
              {this.state.articles.map((element, index) => (
                <div className='col-md-3' key={element.url + index}> {/* Use a more stable key */}
                  <NewsItem
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imgURL={element.urlToImage}
                    newsURL={element.url}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {!this.state.buffering && (
          <div className="d-flex justify-content-between container">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrevClick}
              className="btn btn-danger my-5"
            >
              &larr; Previous
            </button>
            <button
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)}
              type="button"
              onClick={this.handleNextClick}
              className="btn btn-danger my-5"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default News;