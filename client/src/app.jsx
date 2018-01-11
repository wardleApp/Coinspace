import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CoinChart from './components/CoinChart.jsx';
import Chat from './components/Chat.jsx';
import SmallCurrencyToggle from './components/SmallCurrencyToggle.jsx';
import PortfolioPage from './components/PortfolioPage.jsx';
import BTCHistorical from '../../database/Initalize_database_data/BTCUSDHistoricalData.js';
import ETHHistorical from '../../database/Initalize_database_data/ETHUSDHistoricalData.js';
import XRPHistorical from '../../database/Initalize_database_data/XRPUSDHistoricalData.js';
import LTCHistorical from '../../database/Initalize_database_data/LTCUSDHistoricalData.js';

//these three could potentially be the same component with few adjustments...
const Price = function(props) {
  return (
    <div style={{paddingLeft: 165}} className="column">
      <span className="tab" className="small">$</span>
      <span className="tab" className="medium">14,960</span>
      <span className="tab" className="medium">.00</span>
      <p>BITCOIN PRICE</p>
    </div>
  );
};

const SinceLastYearUSD = function(props) {
  return (
    <div style={{paddingLeft: 100}} className="column">
      <span className="plus_minus medium">+</span>
      <span className="small">$</span>
      <span className="medium">14,059</span>
      <span className="medium">.79</span>
      <p>TOTAL CHANGE</p>
    </div>
  );
};

const SinceLastYearPercent = function(props) {
  return (
    <div style={{paddingLeft: 40}} className="column">
      <span className="plus_minus medium">+</span>
      <span className="medium">1555.29</span>
      <span className="small">%</span>
      <p>SINCE LAST YEAR (%)</p>
    </div>
  );
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoin: 1,
      currentTimePeriod: '1Y',
      hourlyData: [],
      dailyData: [],
      weeklyData: [],
      monthlyData: [],
      yearlyData: [],
      historicalData: [],
      chartData: {}, 
      renderedPage: 'Charts'
    };

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    // React Cronjob
    // let minute = new Date().getMinutes() % 15;
    // console.log(15 - minute, 'minutes left');
    // new Promise(() => {
    //   setTimeout(this.getUpdate, 900000 - 60000 * minute)
    // }).then(() => {
    //   // setInterval(this.getUpdate, 1800000);
    // }).catch(err => {
    //   console.log('set interval err', err);
    // });
    this.getChartData();
    this.getUpdate();
    axios.get('/init')
    .then(results => {
      console.log('LOADED DATA', results.data);
      this.setState({
        hourlyData: results.data.monthlyData,
        dailyData: results.data.monthlyData,
        weeklyData: results.data.weeklyData,
        monthlyData: results.data.monthlyData,
        yearlyData: results.data.yearlyData,
        historicalData: results.data.yearlyData,
      })
    })
    .catch(err => {
      console.log('init client', err);
    });
  }

  getChartData(){
    // Ajax calls here
    this.setState({
      chartData:{
        labels: BTCHistorical.map((entry) => entry.Date).reverse(),
        datasets:[
          {
            label:'Price',
            data: BTCHistorical.map((entry) => entry.Price).reverse(),
            backgroundColor:['rgba(255, 99, 132, 0.6)']
          }
        ]
      }
    });
  }

  onSetCoin(coinID) {
    if(this.state.currentTimePeriod === '1H') {
      var currentDataSet = this.state.hourlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'minutes').format('HH:mm'));
      }
    } else if(this.state.currentTimePeriod === '1D') {
      var currentDataSet = this.state.dailyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'hours').format('YYYY-MM-DD HH:mm'));
      }
    } else if(this.state.currentTimePeriod === '1W') {
      var currentDataSet = this.state.weeklyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MM-DD-YYYY'));
      }
    } else if(this.state.currentTimePeriod === '1M') {
      var currentDataSet = this.state.monthlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MM-DD-YYYY'));
      }
    } else if(this.state.currentTimePeriod === '1Y') {
      var currentDataSet = this.state.yearlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.avgmonthprice);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'months').format('MM-DD-YYYY'));
      }
    } else if(this.state.currentTimePeriod === 'ALL') {
      var currentDataSet = this.state.historicalData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.avgmonthprice);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'months').format('MM-DD-YYYY'));
      }
    }
    this.setState({
      currentCoin: parseInt(coinID),
      chartData: {
        labels: inputLabel,
        datasets:[
          {
            label:'Price',
            data: inputData,
            backgroundColor:['rgba(255, 99, 132, 0.6)']
          }
        ]
      }
    });
  }

  onSetTimePeriod(timePeriod) {
    this.setState({currentTimePeriod: timePeriod});
    if(this.state.currentTimePeriod === '1H') {
      var currentDataSet = this.state.hourlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'minutes').format('HH:mm'));
      }
    } else if(this.state.currentTimePeriod === '1D') {
      var currentDataSet = this.state.dailyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'hours').format('YYYY-MM-DD HH:mm'));
      }
    } else if(this.state.currentTimePeriod === '1W') {
      var currentDataSet = this.state.weeklyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MM-DD-YYYY'));
      }
    } else if(this.state.currentTimePeriod === '1M') {
      var currentDataSet = this.state.monthlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MM-DD-YYYY'));
      }
    } else if(this.state.currentTimePeriod === '1Y') {
      var currentDataSet = this.state.yearlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.avgmonthprice);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'months').format('MM-DD-YYYY'));
      }
    } else if(this.state.currentTimePeriod === 'ALL') {
      var currentDataSet = this.state.historicalData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.avgmonthprice);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'months').format('MM-DD-YYYY'));
      }
    }
    this.setState({
      chartData: {
        labels: inputLabel,
        datasets:[
          {
            label:'Price',
            data: inputData,
            backgroundColor:['rgba(255, 99, 132, 0.6)']
          }
        ]
      }
    });
  }

  changeState(data) {
    this.setState({data: data});
  }


  getUpdate() {
    // axios call to server
    // on success, set timeout(at the 00 minute, set the state)
    axios.get('/update')
      .then(results => {
        let minute = new Date().getMinutes() % 30;
        console.log('Half hour update', results.data.rows);
        // setTimeout(()=>{ changeState(data); }, 1800000 - 60000 * minute);
      }).catch(err => {
        console.log('update err', err);
      });
  }

  changePage(e) {
    this.setState({
      renderedPage: e.target.name
    });
  }

  render() {
    const page = this.state.renderedPage;

    return (
      <div>
        <div className="ui massive inverted menu">
          <div className="ui container">
            <a className="item" name="Charts" onClick={this.changePage}>Charts</a>
            <a className="item" name="Portfolio" onClick={this.changePage}>Portfolio</a>
            <div className="right menu">
              <div className="item">
                <a className="item">Log in</a>
              </div>
            </div>
          </div>
        </div>

        {
          page === 'Charts' ? (

            <div className="ui grid">
              <div className="three column row"></div>
              <div className="sixteen column row">

                <div className="one wide column"> </div>
                <SmallCurrencyToggle name='BitCoin' coin={BTCHistorical[0]} />
                <SmallCurrencyToggle name='Ethereum' coin={ETHHistorical[0]} />
                <SmallCurrencyToggle name='Lite Coin' coin={LTCHistorical[0]} />
                <SmallCurrencyToggle name='Ripple' coin={XRPHistorical[0]} />
                <div className="six wide column"></div>

                <button className="ui left floated mini button" id="daily">1D</button>
                <button className="ui left floated mini button" id="monthly">1M</button>
                <button className="ui left floated mini button" id="yearly">1Y</button>

              </div>

              <div className="row">
                <div className="ui three column divided grid triComponentRow">
                  <Price/>
                  <SinceLastYearUSD/>
                  <SinceLastYearPercent/>
                </div>
              </div>

              <CoinChart chartData={this.state.chartData} onSetCoin={this.onSetCoin.bind(this)} onSetTimePeriod={this.onSetTimePeriod.bind(this)}/>

            <div>
              <Chat/>
            </div>

            </div>


          ) : (

            <PortfolioPage />

          )
        }
    );
  }

}


ReactDOM.render(<App />, document.getElementById('app'));




      // <div>
      //   <div className="ui equal width grid">

      //     <div className="one wide column"> </div>
      //     <SmallCurrencyToggle coin={BTCHistorical[0]} />
      //     <SmallCurrencyToggle coin={ETHHistorical[0]} />
      //     <SmallCurrencyToggle coin={LTCHistorical[0]} />
      //     <SmallCurrencyToggle coin={XRPHistorical[0]} />
      //     <div className="nine wide column"></div>

      //     <button className="ui left floated mini button" id="daily">1D</button>
      //     <button className="ui left floated mini button" id="monthly">1M</button>
      //     <button className="ui left floated mini button" id="yearly">1Y</button>

      //   </div>

      //   <div className="centered" id="currencyDisplay">
      //     <Price/>
      //     <SinceLastYearUSD/>
      //     <SinceLastYearPercent/>
      //   </div>


      // </div>
