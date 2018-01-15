import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SmallCurrencyToggle from './components/SmallCurrencyToggle.jsx';
import TriComponentRow from './components/TriComponentRow.jsx';
import CoinChart from './components/CoinChart.jsx';
import Chat from './components/Chat.jsx';
import Login from './components/Login.jsx';
import FBLogin from './components/FacebookLogin.jsx';
import moment from 'moment';
import PortfolioPage from './components/PortfolioPage.jsx';
import Modal from 'react-responsive-modal';
import { Header, Input, Menu, Segment, Container, Divider, Grid, Sticky, Button, Icon, Image, Statistic } from 'semantic-ui-react';
import io from "socket.io-client";

const coins = [
  ['Bitcoin', 'rgba(79, 232, 255, 0.1)', '#4FC7FF'],
  ['Ethereum', 'rgba(241, 245, 125, 0.1)', '#f2b632'],
  ['Litecoin', 'rgba(125, 245, 141, 0.1)', '#2ECC71'],
  ['Ripple', 'rgba(255, 148, 180, 0.1)','#FF4A4A']
];
const labels = {
  // console.log(lastyear > lastweek); // false
  //'1H': [new Date(new Date() - (1000*60*60)), 'minutes', 'hh:mm a', 'Past Hour'],
  '1D': [new Date(new Date() - (1000*60*60*24)), 'hours', 'hh:mm a', 'Since Yesterday'],
  '1W': [new Date(new Date() - (1000*60*60*24*7)), 'days', 'MMM DD', 'Since Last Week'],
  '1M': [new Date(new Date() - (1000*60*60*24*30)), 'days', 'MMM DD', 'Since Last Month'],
  '1Y': [new Date(new Date() - (1000*60*60*24*365)), 'months', 'MMM DD', 'Since Last Year'],
  //'ALL': ['allData', 'days', 'MMM YYYY', 'Since Forever']
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoin: 1,
      currentTimePeriod: '1Y',
      allData: [],
      chartLabels: [],
      chartDataSet:[],
      chartBGcolor:'',
      chartBorderColor: '',
      renderedPage: 'Charts',
      openLogin: false,
      userLogin: false,
      chatOpen: false,
    };
    this.socket = io('https://coinspace.herokuapp.com');
    this.changePage = this.changePage.bind(this);
    this.addData = this.addData.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.socket.on('new data', (results) =>{
      this.addData(results);
    });
  }

  componentDidMount() {
    axios.get('/init')
      .then(results => {
        this.setState({
          allData: results.data
        }, () => {
          this.getChartData();
        });
      }).catch(err => {
        console.log('init client', err);
      });
  }

  getChartData (coinID = this.state.currentCoin, time = this.state.currentTimePeriod) {
    let label = labels[time];
    // filter by current time period and coin and map to prices
    let inputData = this.state.allData.filter((allCoins) => new Date(allCoins.date) > label[0] && +allCoins.coin_id === +coinID).map((entry) => entry.price);
    let inputLabels = inputData.map((data, index) => moment().subtract(index, label[1]).format(label[2]));
    this.setState({
      currentCoin: +coinID,
      currentTimePeriod: time,
      chartLabels: inputLabels.reverse(),
      chartDataSet: inputData,
      chartBGcolor: [coins[coinID - 1][1]],
      chartBorderColor: [coins[coinID - 1][2]]
    });
  }

  onSetTimePeriod(e, { value }) {
    this.getChartData(this.state.currentCoin, value);
  }

  addData(data) {
    this.setState({
      allData: [...this.state.allData, ...data]
    }, () => {
      this.getChartData();
    });
  }

  changePage(e, { name }) {
    this.setState({
      renderedPage: name
    });
    console.log(name);
  }

  openLoginModal() {
    this.setState({
      openLogin: true
    });
  }

  closeLoginModal() {
    this.setState({
      openLogin: false
    });
  }

  userLogin() {
    this.setState({
      userLogin: true,
      openLogin: false
    });
  }

  userLogout() {
    this.setState({
      userLogin: false,
      renderedPage: 'Charts'
    });
  }

  onChatOpen() {
    this.setState({ 
      chatOpen: true 
    });
  }

  onChatClose() {
    this.setState({ 
      chatOpen: false 
    })
  }

  render() {

    const { renderedPage } = this.state;

    if (this.state.allData.length === 0) {
      return <div/>;
    }

    return (
      <div id="mainWrapper" className="mainBackground">
        <Container fluid>
          <Menu color='blue' inverted>
          <Header as='h2' id="companyLogo">
          <Image circular id="coinRebase" src={require('../dist/img/sfkiwi.gif')}/>
            coin rebase
          </Header>
            <Menu.Menu position='right'>
              <Menu.Item name='Charts' active={renderedPage === 'Charts'} onClick={this.changePage}><Icon name='line chart'/>Charts</Menu.Item>
              {this.state.userLogin ? null : <Menu.Item name='Login' active={this.state.openLogin} onClick={this.openLoginModal.bind(this)}><Icon name='key'/>Login</Menu.Item>}
              {this.state.openLogin ? <Login userLogin={this.userLogin.bind(this)} userLogout={this.userLogout.bind(this)} openLogin={this.state.openLogin} closeLoginModal={this.closeLoginModal.bind(this)}/> : null}
              {this.state.userLogin ? <Menu.Item name='Portfolio' active={renderedPage === 'Portfolio'} onClick={this.changePage}><Icon name='dashboard'/>Portfolio</Menu.Item> : null}
              {this.state.userLogin ? <Menu.Item name='Logout' onClick={this.userLogout.bind(this)}><Icon name='power'/>Logout</Menu.Item> : null}
            </Menu.Menu>
          </Menu>
        </Container>

        {this.state.renderedPage === 'Charts' ? (
          <div className="ui grid">
            <div className="three column row"></div>
            <div className="sixteen column row">
              <div className="one wide column"></div>
              {coins.map((coin, index) =>
                <SmallCurrencyToggle key={index} state={this.state} onSetCoin={this.getChartData.bind(this)} coin_id={index + 1} name={coin[0]} />
              )}
              <Menu pointing secondary>
              <Menu.Item active={this.state.chatOpen} name='chat' onClick={this.onChatOpen.bind(this)}><Icon name='comments' size='big'/></Menu.Item>
              </Menu>
              {this.state.chatOpen ? <Chat socket={this.socket} chatOpen={this.state.chatOpen} onChatClose={this.onChatClose.bind(this)}/> : null}
              <div className="four wide column"></div>
              {Object.keys(labels).map((label, index) =>
                <Menu pointing secondary key={index}>
                  <Menu.Menu position='right'>
                    <Menu.Item active={this.state.currentTimePeriod === label} name={label} onClick={this.onSetTimePeriod.bind(this)} value={label}/>
                  </Menu.Menu>
                </Menu>
              )}

              <div className='column'></div>
            </div>
            <TriComponentRow coins={coins} labels={labels} state={this.state}/>
            <CoinChart state={this.state} />
          </div>
        ) : (<PortfolioPage state={this.state}/>)
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
