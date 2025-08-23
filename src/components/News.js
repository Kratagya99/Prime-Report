import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles=[
    
]

  constructor(){
    super();
    console.log("This is a constructor");
    this.state={
      articles: this.articles,
      loading:false
    }
  }
  async componentDidMount() {
  let url = "https://newsapi.org/v2/top-headlines?q=india&apiKey=15b719b3c34145309bd3e53c95dc50a9";
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);

  const filteredArticles = parsedData.articles.filter(
    (article) => article.source.name !== "Google News (India)"
  );

  this.setState({
    articles: filteredArticles
  });
}
  render() {
    return (
      <div>
        <h2 className='text-center'>India's Top Headlines</h2>
        <div className='container my-3'>
          <div className='row'>
          {this.state.articles.map((element)=>{
            return <div className='col-md-3'>
        <NewsItem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,88):""} imgURL={element.urlToImage} newsURL={element.url}/>
            </div>   
          })}
          </div>
        </div>
      </div>
    )
  }
}

export default News