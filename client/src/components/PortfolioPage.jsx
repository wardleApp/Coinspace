import React from 'react';
import axios from 'axios';
import TotalAllocations from './TotalAllocations.jsx';
import CoinChartCard from './CoinChartCard.jsx';
import TopCryptoNews from './TopCryptoNews.jsx';
import ActivityFeed from './ActivityFeed.jsx';

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Dashboard',
      articles: []
    };
    
    const chartData = {
      labels: props.state.chartLabels,
      datasets: [{
        label: 'Price',
        data: props.state.chartDataSet,
        backgroundColor: props.state.chartBGcolor,
        borderColor: props.state.chartBorderColor
      }]
    };
    this.changeLayout = this.changeLayout.bind(this);
    this.getNews = this.getNews.bind(this);
  }

  componentDidMount() {
    this.getNews();
  }

  getNews() {
    axios.get('/news')
      .then(results => {
        console.log('API call success');
        this.setState({
          articles: results.data.articles
        });
      }).catch(err => {
        console.log('update err', err);
      });
  }

  changeLayout (e) {
    this.setState({
      page: e.target.name
    });
  }

  render() {

    if (this.state.articles.length === 0) {
      return <div/>;
    } 

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

              <CoinChartCard chartData={chartData}/>
              <TotalAllocations />

              <TopCryptoNews articles={this.state.articles}/> 
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
