import React from 'react';
import TotalAllocations from './TotalAllocations.jsx';
import CoinChartCard from './CoinChartCard.jsx';
import TopCryptoNews from './TopCryptoNews.jsx';
import ActivityFeed from './ActivityFeed.jsx';

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Dashboard'
    };

    this.changeLayout = this.changeLayout.bind(this);
  }

  changeLayout (e) {
    this.setState({
      page: e.target.name
    });
  }

  render() {
    return (
      <div className="ui segment pushable" id="portfolioPage">

        {/* ------- The HTML below is for the Left Main Sidebar ---------------*/}
        <div className="ui visible inverted left vertical sidebar menu">
          <a className="item" name="Dashboard" onClick={this.changeLayout}>
            <i className="large inverted blue dashboard icon"></i>
            Dashboard
          </a>
          <a className="item" name="Total Allocations" onClick={this.changeLayout}>
            <i className="large inverted blue pie chart icon"></i>
            Total Allocations
          </a>
          <a className="item" name="Bitcoin Graph" onClick={this.changeLayout}>
            <i className="large inverted blue bitcoin icon"></i>
            BitCoin
          </a>
          <a className="item" name="Ethereum Graph" onClick={this.changeLayout}>
            <i className="large inverted blue sort icon"></i>
            Ethereum
          </a>
        </div>
        {/* -------------- The Side Bar HTML Ends here -------------------------*/}


        {/* ----- HTML Below Designates the Content Space (two cards wide) -----*/}
        <div className="pusher">
          <div className="ui segment">
            <h2 className="header centered"> {this.state.page} </h2>
            <div className="ui two stackable cards">

              <CoinChartCard chartData={this.props.chartData}/>
              <TotalAllocations />
              <TopCryptoNews /> 
              <ActivityFeed />
              {/* -------------- The Content Space HTML Ends here -------------------------*/}


            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default PortfolioPage;

