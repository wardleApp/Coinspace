import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SmallCurrencyToggle from './components/SmallCurrencyToggle.jsx';
import TriComponentRow from './components/TriComponentRow.jsx';
import CoinChart from './components/CoinChart.jsx';
import Chat from './components/Chat.jsx';
import moment from 'moment';
import Delay from 'react-delay';

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
      backgroundColor: 'rgba(79, 232, 255, 0.1)',
      borderColor: '#4FC7FF',
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
    this.getUpdate();
    axios.get('/init')
    .then(results => {
      this.setState({
        hourlyData: results.data.monthlyData,
        dailyData: results.data.monthlyData,
        weeklyData: results.data.weeklyData,
        monthlyData: results.data.monthlyData,
        yearlyData: results.data.yearlyData,
        historicalData: results.data.yearlyData
      })
    })
    .then(() => {
      this.getChartData()
    })
    .catch(err => {
      console.log('init client', err);
    });
  }

  getChartData(){
    // Define the initial labels.
    var inputLabel = [];
      for(var i = 0; i < 365; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MMM YYYY'));
    }
    this.setState({
      chartData:{
        labels: inputLabel.reverse(),
        datasets:[
          {
            label:'Price',
            data: this.state.historicalData.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price).reverse(),
            backgroundColor:[this.state.backgroundColor],
            borderColor: [this.state.borderColor]
          }
        ]
      }
    });
  }

  onSetCoin(coinID) {
    coinID === '1' ? this.setState({currentCoin: 1, backgroundColor: 'rgba(79, 232, 255, 0.1)', borderColor: '#4FC7FF'}) : 
    coinID === '2' ? this.setState({currentCoin: 2, backgroundColor: 'rgba(241, 245, 125, 0.1)', borderColor: '#f2b632'}) :
    coinID === '3' ? this.setState({currentCoin: 3, backgroundColor: 'rgba(125, 245, 141, 0.1)', borderColor: '#2ECC71'}) : 
    this.setState({currentCoin: 4, backgroundColor: 'rgba(255, 148, 180, 0.1)', borderColor: '#FF4A4A'})
    if(this.state.currentTimePeriod === '1H') {
      var currentDataSet = this.state.hourlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'minutes').format('hh:mm a'));
      }
    } else if(this.state.currentTimePeriod === '1D') {
      var currentDataSet = this.state.dailyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'hours').format('hh:mm a'));
      }
    } else if(this.state.currentTimePeriod === '1W') {
      var currentDataSet = this.state.weeklyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MMM DD'));
      }
    } else if(this.state.currentTimePeriod === '1M') {
      var currentDataSet = this.state.monthlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MMM DD'));
      }
    } else if(this.state.currentTimePeriod === '1Y') {
      var currentDataSet = this.state.yearlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'months').format('MMM DD'));
      }
    } else if(this.state.currentTimePeriod === 'ALL') {
      var currentDataSet = this.state.historicalData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === parseInt(coinID)}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MMM YYYY'));
      }
    }
    this.setState({
      currentCoin: parseInt(coinID),
      chartData: {
        labels: inputLabel.reverse(),
        datasets:[
          {
            label:'Price',
            data: inputData.reverse(),
            backgroundColor:[this.state.backgroundColor],
            borderColor: [this.state.borderColor]
          }
        ]
      }
    });
  }

  onSetTimePeriod(e) {
    this.setState({currentTimePeriod: e.target.value});
    if(this.state.currentTimePeriod === '1H') {
      var currentDataSet = this.state.hourlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'minutes').format('hh:mm a'));
      }
    } else if(this.state.currentTimePeriod === '1D') {
      var currentDataSet = this.state.dailyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'hours').format('hh:mm a'));
      }
    } else if(this.state.currentTimePeriod === '1W') {
      var currentDataSet = this.state.weeklyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MMM DD'));
      }
    } else if(this.state.currentTimePeriod === '1M') {
      var currentDataSet = this.state.monthlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MMM DD'));
      }
    } else if(this.state.currentTimePeriod === '1Y') {
      var currentDataSet = this.state.yearlyData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'months').format('MMM DD'));
      }
    } else if(this.state.currentTimePeriod === 'ALL') {
      var currentDataSet = this.state.historicalData;
      var inputData = currentDataSet.filter((allCoins) => {return allCoins.coin_id === this.state.currentCoin}).map((entry) => entry.price);
      var inputLabel = [];
      for(var i = 0; i < inputData.length; i++) {
        inputLabel.push(moment().subtract(i, 'days').format('MMM YYYY'));
      }
    }
    this.setState({
      chartData: {
        labels: inputLabel.reverse(),
        datasets:[
          {
            label:'Price',
            data: inputData.reverse(),
            backgroundColor:[this.state.backgroundColor],
            borderColor: [this.state.borderColor]
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
    if(this.state.weeklyData.length === 0) {
      return <div/>
    } else if(!this.state.chartData.datasets) {
      return <div/>
    }

    return (
      <div className="ui grid">
        <div className="three column row"></div>
        <div className="sixteen column row">
          <div className="one wide column"> </div>

          <SmallCurrencyToggle onSetCoin={this.onSetCoin.bind(this)} coin_id='1' name='Bitcoin' coin={this.state.weeklyData.filter((allCoins) => {return allCoins.coin_id === 1})[0].price} />
          <SmallCurrencyToggle onSetCoin={this.onSetCoin.bind(this)} coin_id='2' name='Ethereum' coin={this.state.weeklyData.filter((allCoins) => {return allCoins.coin_id === 2})[0].price} />
          <SmallCurrencyToggle onSetCoin={this.onSetCoin.bind(this)} coin_id='3' name='Litecoin' coin={this.state.weeklyData.filter((allCoins) => {return allCoins.coin_id === 3})[0].price} />
          <SmallCurrencyToggle onSetCoin={this.onSetCoin.bind(this)} coin_id='4' name='Ripple' coin={this.state.weeklyData.filter((allCoins) => {return allCoins.coin_id === 4})[0].price} />

          <div className="three wide column"></div>
          <button className="ui left floated mini button" id="hourly" value="1H" onClick={this.onSetTimePeriod.bind(this)}>1H</button>
          <button className="ui left floated mini button" id="daily" value="1D" onClick={this.onSetTimePeriod.bind(this)}>1D</button>
          <button className="ui left floated mini button" id="weekly" value="1W" onClick={this.onSetTimePeriod.bind(this)}>1W</button>
          <button className="ui left floated mini button" id="monthly" value="1M" onClick={this.onSetTimePeriod.bind(this)}>1M</button>
          <button className="ui left floated mini button" id="yearly" value="1Y" onClick={this.onSetTimePeriod.bind(this)}>1Y</button>
          <button className="ui left floated mini button" id="alltime" value="ALL" onClick={this.onSetTimePeriod.bind(this)}>ALL</button>
        </div>

        <div className="row">
          <div className="ui three column divided grid TriComponentRow">
            <TriComponentRow chartData={this.state.chartData} currentCoin={this.state.currentCoin} currentTimePeriod={this.state.currentTimePeriod}/>
          </div>
        </div>
        <div>
          <Chat/>
        </div>
          <CoinChart chartData={this.state.chartData} onSetCoin={this.onSetCoin.bind(this)} onSetTimePeriod={this.onSetTimePeriod.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));