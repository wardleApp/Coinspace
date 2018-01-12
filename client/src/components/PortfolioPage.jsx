import React from 'react';

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui segment pushable" id="portfolioPage">
        <div className="ui visible inverted left vertical sidebar menu">
          <a className="item">
            <i className="home icon"></i>
            Home
          </a>
          <a className="item">
            <i className="block layout icon"></i>
            Total Allocations
          </a>
          <a className="item">
            <i className="smile icon"></i>
            BitCoin
          </a>
          <a className="item">
            <i className="calendar icon"></i>
            Ethereum
          </a>
        </div>
        <div className="pusher">
          <div className="ui basic segment">
            <h3 className="ui header">Application Content</h3>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>

    );
  }
}

export default PortfolioPage;