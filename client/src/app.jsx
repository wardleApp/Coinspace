import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SmallCurrencyToggle from './components/SmallCurrencyToggle.jsx';
import TriComponentRow from './components/TriComponentRow.jsx';
import CoinChart from './components/CoinChart.jsx';
import Chat from './components/Chat.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import moment from 'moment';
import Delay from 'react-delay';
import PortfolioPage from './components/PortfolioPage.jsx';
import Modal from 'react-responsive-modal';

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
      coins: [
        ['Bitcoin', 'rgba(79, 232, 255, 0.1)', '#4FC7FF'],
        ['Ethereum', 'rgba(241, 245, 125, 0.1)', '#f2b632'],
        ['Litecoin', 'rgba(125, 245, 141, 0.1)', '#2ECC71'],
        ['Ripple', 'rgba(255, 148, 180, 0.1)','#FF4A4A']
      ],
      labels: {
        '1H': ['hourlyData', 'minutes', 'hh:mm a'],
        '1D': ['dailyData', 'hours', 'hh:mm a'],
        '1W': ['weeklyData', 'days', 'MMM DD'],
        '1M': ['monthlyData', 'days', 'MMM DD'],
        '1Y': ['yearlyData', 'months', 'MMM DD'],
        'ALL': ['historicalData', 'days', 'MMM YYYY']
      },
      renderedPage: 'Charts'
    };

    this.changePage = this.changePage.bind(this);
    this.addData = this.addData.bind(this);
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
        });
      })
      .then(() => {
        this.getChartData();
      })
      .catch(err => {
        console.log('init client', err);
      });
  }

  getChartData(){
    // Define the initial labels.
    var inputLabel = [];
    for (let i = 0; i < 365; i++) {
      inputLabel.push(moment().subtract(i, 'days').format('MMM YYYY'));
    }
    this.setState({
      chartData:{
        labels: inputLabel.reverse(),
        datasets:[
          {
            label:'Price',
            data: this.state.historicalData.filter((allCoins) => allCoins.coin_id === this.state.currentCoin).map((entry) => entry.price).reverse(),
            backgroundColor:[this.state.coins[0][1]],
            borderColor: [this.state.coins[0][2]]
          }
        ]
      }
    });
  }

  onSetCoin(coinID) {
    let currentDataSet = this.state[this.state.labels[this.state.currentTimePeriod][0]];
    let inputData = currentDataSet.filter((allCoins) => allCoins.coin_id === parseInt(coinID)).map((entry) => entry.price);
    this.setState({
      currentCoin: +coinID,
      chartData: {
        labels: this.state.chartData.labels,
        datasets:[
          {
            label:'Price',
            data: inputData.reverse(),
            backgroundColor:[this.state.coins[coinID - 1][1]],
            borderColor: [this.state.coins[coinID - 1][2]]
          }
        ]
      }
    });
  }

  onSetTimePeriod(e) {
    let label = this.state.labels[e.target.value];
    let currentDataSet = this.state[label[0]];
    let inputData = currentDataSet.filter((allCoins) => +allCoins.coin_id === +this.state.currentCoin).map((entry) => entry.price);
    let inputLabel = inputData.map((data, index) => moment().subtract(index, label[1]).format(label[2]));
    this.setState({
      currentTimePeriod: e.target.value,
      chartData: {
        labels: inputLabel.reverse(),
        datasets:[
          {
            label:'Price',
            data: inputData.reverse(),
            backgroundColor:[this.state.coins[this.state.currentCoin - 1][1]],
            borderColor: [this.state.coins[this.state.currentCoin - 1][2]]
          }
        ]
      }
    });
  }

  addData(data) {
    new Promise((resolve, reject) => {
      this.setState({
        hourlyData: [...this.state.hourlyData, ...data],
        dailyData: [...this.state.dailyData, ...data],
        weeklyData: [...this.state.weeklyData, ...data],
        monthlyData: [...this.state.monthlyData, ...data],
        yearlyData: [...this.state.yearlyData, ...data],
        historicalData: [...this.state.historicalData, ...data]
      });
    }).then(results => {
      console.log(data[3], 'equal', this.state.hourlyData.slice(-1));
    });
  }

  getUpdate() {
    // axios call to server
    // on success, set timeout(at the 00 minute, set the state)
    axios.get('/update')
      .then(results => {
        let minute = new Date().getMinutes() % 30;
        console.log(`Half hour update in ${30 - minute} minutes`);
        console.log(results.data.rows);
        console.log(this);
        this.addData(results.data.rows);
        setTimeout(()=>{
          // this.addData(results.data.rows);
        }, 1800000 - 60000 * minute);
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

    if (this.state.weeklyData.length === 0) {
      return <div/>;
    } else if (!this.state.chartData.datasets) {
      return <div/>;
    }

    const page = this.state.renderedPage;

    return (
      <div id="mainWrapper">
        <div id="mainMenu" className="ui massive inverted menu">
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
                {this.state.coins.map((coin, index) =>
                  <SmallCurrencyToggle key={index} onSetCoin={this.onSetCoin.bind(this)} coin_id={index + 1} name={coin[0]} coin={this.state.weeklyData.filter((allCoins) => {return allCoins.coin_id === index + 1})[0].price} />
                )}
                <div className="three wide column"></div>
                {Object.keys(this.state.labels).map((label, index) =>
                  <button className="ui left floated mini button" key={index} value={label} onClick={this.onSetTimePeriod.bind(this)}>{label}</button>
                )}
              </div>

              <div className="row">
                <div className="ui five column divided grid TriComponentRow">
                  <TriComponentRow chartData={this.state.chartData} currentCoin={this.state.currentCoin} currentTimePeriod={this.state.currentTimePeriod}/>
                </div>
              </div>
              <div>
              <SignUp/>
              <SignIn/>
              </div>
              <CoinChart chartData={this.state.chartData} onSetCoin={this.onSetCoin.bind(this)} onSetTimePeriod={this.onSetTimePeriod.bind(this)}/>
              <Chat/>
            </div>
          ) : (

            <PortfolioPage chartData={this.state.chartData} onSetCoin={this.onSetCoin.bind(this)} onSetTimePeriod={this.onSetTimePeriod.bind(this)}/>

          )
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
