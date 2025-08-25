import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    console.log("This is a constructor");
    this.state={
      articles: [],
      loading:false,
      page:1,
      totalResults: 0
    }
  }

  async componentDidMount() {
    this.fetchNews(this.state.page);
  }

  fetchNews = async (page) => {
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${page}&pageSize=20`;
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);

  const filteredArticles = parsedData.articles 
    ? parsedData.articles.filter(
        (article) => article.source.name !== "Google News (India)" && article.urlToImage
      )
    : [];

  this.setState({
    articles: filteredArticles,
    totalResults: parsedData.totalResults || 0,
    page: page
  });
}


  handlePrevClick = async () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  }

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)) {
      this.fetchNews(this.state.page + 1);
    }
  }

  render() {
    return (
      <div>
        <h2 className='text-center my-4'>US Top Headlines</h2>
        <div className='container my-3'>
          <div className='row'>
            {this.state.articles.map((element, index) => {
              return <div className='col-md-3' key={index}>
                <NewsItem 
                  title={element.title ? element.title.slice(0,50) : ""} 
                  description={element.description ? element.description.slice(0,88) : ""} 
                  imgURL={element.urlToImage} 
                  newsURL={element.url}/>
              </div>   
            })}
          </div>
        </div>
        <div className="d-flex justify-content-between container">
          <button 
            disabled={this.state.page <= 1} 
            type="button" 
            onClick={this.handlePrevClick} 
            className="btn btn-danger my-5">
            &larr; Previous
          </button>
          <button 
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} 
            type="button" 
            onClick={this.handleNextClick} 
            className="btn btn-danger my-5">
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}

export default News
