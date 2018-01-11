import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CoinChart from './components/CoinChart.jsx';
import BTCHistorical from '../../database/Initalize_database_data/BTCUSDHistoricalData.js';
import ETHHistorical from '../../database/Initalize_database_data/ETHUSDHistoricalData.js';
import XRPHistorical from '../../database/Initalize_database_data/XRPUSDHistoricalData.js';
import LTCHistorical from '../../database/Initalize_database_data/LTCUSDHistoricalData.js';

//these three could potentially be the same component with few adjustments...
const Price = function(props) {
  return (
    <div className="centered" id="presentValue">
      <span className="tab" className="medium">$</span>
      <span className="tab" className="large">14.960</span>
      <span className="tab" className="medium">.00</span>
      <p>BITCOIN PRICE</p>
    </div>
  );
};

const SinceLastYearUSD = function(props) {
  return (
    <div className="centered" id="sinceLastYear$">
      <span className="plus_minus medium">+</span>
      <span className="medium">$</span>
      <span className="large">14.059</span>
      <span className="medium">.79</span>
      <p>SINCE LAST YEAR (USD)</p>
    </div>
  );
};

const SinceLastYearPercent = function(props) {
  return (
    <div className="centered" id="sinceLastYear%">
      <span className="plus_minus medium">+</span>
      <span className="large">1555.29</span>
      <span className="medium">%</span>
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
      chartData: {}
    };
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

  render() {

    return (
      <div>
        <div className="nav">

          <div>
            <span className="tab">Bitcoin $14,950.70</span>
            <span className="tab">Ethereum $1,209.82</span>
            <span className="tab">Litecoin $254.02</span>
          </div>

          <div>
            <span className="tab" id="daily">1D</span>
            <span className="tab" id="monthly">1M</span>
            <span className="tab" id="yearly">1Y</span>
          </div>

        </div>

        <div className="centered" id="currencyDisplay">
          <Price/>
          <SinceLastYearUSD/>
          <SinceLastYearPercent/>
        </div>

        <div id="graph">
        <CoinChart chartData={this.state.chartData} onSetCoin={this.onSetCoin.bind(this)} onSetTimePeriod={this.onSetTimePeriod.bind(this)}/>
        </div>
      </div>
    );
  }

}


ReactDOM.render(<App />, document.getElementById('app'));
