import React from 'react';

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
      title: 'EOS Price Surges by 40% as South Korea Cryptocurrency Market Recover',
      description: 'EOS has surpassed $9 billion in market valuation for the first time in history, recording a daily gain of over 40 percent as the South Korea cryptocurrency exchange market recovered from the trading ban FUD.',
      url: 'https://www.ccn.com/eos-price-surges-by-40-as-south-korea-cryptocurrency-market-recovers-from-fud/',
      urlToImage: 'https://www.ccn.com/wp-content/uploads/2016/03/Higher-climb.jpg',
      publishedAt: '2018-01-12T18:19:31Z'
    };

    return (
      <div id="dashCard" className="ui blue raised link card">
        <div className="content">
          <h2 className="header">{sampleData.source.name}</h2>
          <div className="ui divider"></div>
          <div className="content">
            <h5 className="header">{sampleData.title}</h5>
            <div className="ui divider"> </div>
          </div>
          <div className="ui grid">
            <div className="ui two column row">
              <div className="image column">
                <img style={{width: 200, height: 200}} src='https://www.ccn.com/wp-content/uploads/2016/03/Higher-climb.jpg'></img>
              </div>
              <div className="column">
                <p className="description">{sampleData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  }
}


export default TopCryptoNews;


        // <div className="content">
        //   <a className="header">Kristy</a>
        //   <div className="description">
        //     Kristy is an art director living in New York.
        //   </div>
        // </div>