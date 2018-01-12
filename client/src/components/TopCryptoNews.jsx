import React from 'react';
import moment from 'moment';

class TopCryptoNews extends React.Component {
  constructor() {
    super();
  }

  render() {
    const sampleData = {
      source: {
        id: 'crypto-coins-news',
        name: 'Crypto Coins News'
      },
      author: null,
      title: 'Ripple Price Surges by 18%, as MoneyGram Finds Use Case of XRP',
      description: 'Over the past 24 hours, the price of Ripple’s native cryptocurrency XRP has increased by more than 18 percent, recovering back to $2 after dipping below $1.7 during a major cryptocurrency market correction that occured on January 11.',
      url: 'https://www.ccn.com/ripple-price-surges-by-18-as-moneygram-finds-use-case-of-xrp/',
      urlToImage: 'https://www.ccn.com/wp-content/uploads/2018/01/Wave-surge-beach.jpg',
      publishedAt: '2018-01-12T13:50:22Z'
    };

    return (
      <div id="dashCard" className="ui blue raised link card">
        <div className="content">
          <h2 className="header">Top Article from Your News Feed</h2>
          <div className="ui divider"></div>
          <div className="content">
            <h5 className="header">{sampleData.title}</h5>
            <div className="ui divider"> </div>
          </div>
          <div className="ui grid">
            <div className="ui two column row">
              <div className="image column">
                <a href={sampleData.url}>
                  <img style={{width: 240, height: 200}} src='https://www.ccn.com/wp-content/uploads/2016/03/Higher-climb.jpg'></img>
                </a>
              </div>
              <div className="column">
                <p className="description">{sampleData.description}</p>
                <p></p>
                <p>{'Article Published On:  ' + (sampleData.publishedAt).slice(0, 10)}</p>          
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  }
}


export default TopCryptoNews;
