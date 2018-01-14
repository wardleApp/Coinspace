import React from 'react';
import moment from 'moment';
import sampleData from '../exampleData/newsFeedData.js';

class TopCryptoNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: props.articles,   
      curArticle: 0
    };

    this.changeArticle = this.changeArticle.bind(this);
  }



  changeArticle(e) {
    if (this.state.curArticle === this.state.articles.length - 1) {
      this.setState({
        curArticle: 0
      });
    } else {
      this.setState({
        curArticle: this.state.curArticle + 1
      });
    }
  }

  render() {

    return (
      <div id="dashCard" className="ui blue raised link card">
        <div className="content">
          <div onClick={this.changeArticle} id="nextButton" className="mini ui blue basic right floated animated button" tabIndex="0">
            <div className="visible content">Next</div>
            <div className="hidden content">
              <i className="right arrow icon"></i>
            </div>
          </div>
          <h2 className="header">Top Article from Your News Feed</h2>
          <div className="ui divider"></div>
          <div className="content">
            <h5 className="header">{this.state.articles[this.state.curArticle].title}</h5>
            <div className="ui divider"> </div>
          </div>
          <div className="ui grid">
            <div className="ui two column row">
              <div className="image column">
                <a href={this.state.articles[this.state.curArticle].url}>
                  <img style={{width: 240, height: 200}} src={this.state.articles[this.state.curArticle].urlToImage}></img>
                </a>
              </div>
              <div className="column">
                <p className="description">{this.state.articles[this.state.curArticle].description}</p>
                <p></p>
                <p>{'Article Published On:  ' + (this.state.articles[this.state.curArticle].publishedAt).slice(0, 10)}</p>          
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  }
}


export default TopCryptoNews;


