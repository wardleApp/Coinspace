import React from 'react';
import axios from 'axios';
import TotalAllocations from './TotalAllocations.jsx';
import CoinChartCard from './CoinChartCard.jsx';
import TopCryptoNews from './TopCryptoNews.jsx';
import ActivityFeed from './ActivityFeed.jsx';
import { Header, Input, Menu, Segment, Container, Divider, Grid, Sticky, Button, Icon, Image, Statistic } from 'semantic-ui-react';

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Dashboard',
      articles: [],
      coinAllocation: [100, 25, 35]
    };

    this.chartData = {
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
    console.log(e.target);
  }

  getCoinAllocation() {
    var bitcoinQuantity = parseInt(document.getElementById('bitcoinInput').value);
    var ethereumQuantity = parseInt(document.getElementById('ethereumInput').value);
    var litecoinQuantity = parseInt(document.getElementById('litecoinInput').value);
    this.setState({
      coinAllocation: [bitcoinQuantity, ethereumQuantity, litecoinQuantity]
    })
  }

  // changeLayout (e) {
  //   this.setState({
  //     page: e.target.name
  //   });
  // }

  render() {

    if (this.state.articles.length === 0) {
      return <div/>;
    } else if (this.props.state.chartLabels === undefined) {
      return <div/>;
    }


    return (
      <div className="ui segment pushable" id="portfolioPage">

        {/* ------- The HTML below is for the Left Main Sidebar ---------------*/}
        <div className="ui visible inverted left vertical sidebar menu">
          <a className="item" name="Dashboard" onClick={this.changeLayout}>
            <i name="Dashboard" className="bordered white dashboard icon"></i>
            Dashboard
          </a>
          <a className="item" name="Graph" onClick={this.changeLayout}>
            <i name="Graph" className="bordered white line chart icon"></i>
            Current Graph
          </a>
          <a className="item" name="TotalAllocations" onClick={this.changeLayout}>
            <i name="TotalAllocations" className="bordered white pie chart icon"></i>
            Total Allocations
          </a>
          <a className="item" name="NewsFeed" onClick={this.changeLayout}>
            <i name="NewsFeed" className="bordered white feed icon"></i>
            News Feed
          </a>
          <a className="item" name="ActivityFeed" onClick={this.changeLayout}>
            <i name="ActivityFeed" className="bordered white tasks icon"></i>
            Recent Activity
          </a>
          <a className="item" name="Bitcoin Graph" onClick={this.changeLayout}>
            <Input id='bitcoinInput' fluid icon='add circle' iconPosition='left' placeholder='Bitcoin'></Input>
          </a>
          <a className="item" name="Bitcoin Graph" onClick={this.changeLayout}>
            <Input id='ethereumInput' fluid icon='add circle' iconPosition='left' placeholder='Ethereum' size='tiny'></Input>
          </a>
          <a className="item" name="Bitcoin Graph" onClick={this.changeLayout}>
            <Input id='litecoinInput' fluid icon='add circle' iconPosition='left' placeholder='Litecoin' size='tiny'></Input>
          </a>
          <a className="item" name="Bitcoin Graph" onClick={this.changeLayout}>
            <Button icon labelPosition='right' animated color='green' onClick={this.getCoinAllocation.bind(this)}>
            <Button.Content visible>Change Your Portfolio<Icon name='add circle'/></Button.Content>
            <Button.Content hidden><Icon name='right arrow'/></Button.Content></Button>
          </a>
        </div>
        {/* -------------- The Side Bar HTML Ends here -------------------------*/}


        {/* ----- HTML Below Designates the Content Space (two cards wide) -----*/}
        <div className="pusher">
          <div className="ui segment">
            <h2 className="header centered"> {this.state.page} </h2>
            <div className="ui two stackable cards">
              <CoinChartCard chartData={this.chartData} currentCoinData={this.props.state}/> 
              <TotalAllocations name='TotalAllocations' coinAllocation={this.state.coinAllocation}/>
              <TopCryptoNews name='NewsFeed' articles={this.state.articles}/> 
              <ActivityFeed name='ActivityFeed'/>
              {/* -------------- The Content Space HTML Ends here -------------------------*/}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default PortfolioPage;
