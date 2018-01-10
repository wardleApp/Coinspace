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
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });
  }

  onSetData(coinName) {
    if(coinName === 'BTC') {
      var coin = BTCHistorical;
    } else if(coinName === 'ETH') {
      var coin = ETHHistorical;
    } else if(coinName === 'XRP') {
      var coin = XRPHistorical;
    } else if(coinName === 'LTC') {
      var coin = LTCHistorical;
    }
    this.setState({
      chartData:{
        labels: coin.map((entry) => entry.Date).reverse(),
        datasets:[
          {
            label:'Price',
            data: coin.map((entry) => entry.Price).reverse(),
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
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
      .then((data) => {
        let minute = new Date().getMinutes() % 30;
        setTimeout(()=>{ changeState(data); }, 1800000 - 60000 * minute);
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
        <CoinChart chartData={this.state.chartData} onSetData={this.onSetData.bind(this)}/>
        </div>
      </div>
    );
  }

}


ReactDOM.render(<App />, document.getElementById('app'));