import React from 'react';
import ReactDOM from 'react-dom';
import {Pie, Line, Bar} from 'react-chartjs-2';

class CoinChart extends React.Component {
  constructor(props) {
    super(props)
  }

  onClickCoinName(e) {
    this.props.onSetCoin(e.target.value)
  }

  onClickTimePeriod(e) {
    this.props.onSetTimePeriod(e.target.value)
  }

  render(){
    return (
      <div className="sixteen column row graphRow">
        <div className="two wide column"></div>
        <div className="twelve wide column">
          <Line data={this.props.chartData} height={38} width={100} options={{
            scales: { xAxes: [{ gridLines: { display:false }}], yAxes: [{ gridLines: { display:false }}]},
            legend: { display: false }, 
          }}/>
        </div>
        <div className="two wide column"></div>
      </div>
    );
  }
}

export default CoinChart;


// <div>
// <div>
//   <button value="1" onClick={this.onClickCoinName.bind(this)}>Bitcoin</button>
// </div>
// <div>
//   <button value="2" onClick={this.onClickCoinName.bind(this)}>Ethereum</button>
// </div>
// <div>
//   <button value="3" onClick={this.onClickCoinName.bind(this)}>Ripple</button>
// </div>
// <div>
//   <button value="4" onClick={this.onClickCoinName.bind(this)}>Litecoin</button>
// </div>
// <div>
//   <button value="1H" onClick={this.onClickTimePeriod.bind(this)}>1H</button><button value="1D" onClick={this.onClickTimePeriod.bind(this)}>1D</button><button value="1W" onClick={this.onClickTimePeriod.bind(this)}>1W</button><button value="1M" onClick={this.onClickTimePeriod.bind(this)}>1M</button><button value="1Y" onClick={this.onClickTimePeriod.bind(this)}>1Y</button><button value="ALL" onClick={this.onClickTimePeriod.bind(this)}>ALL</button>
// </div>
// </div>

