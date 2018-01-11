import React from 'react';
import ReactDOM from 'react-dom';
import {Pie, Line, Bar, defaults} from 'react-chartjs-2';
defaults.global.defaultFontFamily = 'minecraft';
defaults.global.defaultFontSize = 14;

class CoinChart extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="sixteen column row graphRow">
        <div className="two wide column"></div>
        <div className="twelve wide column">
          <Line data={this.props.chartData} options={{
          layout: {
            padding: {
              left: 170,
              right: 170,
              top: 160,
              bottom: 160,
            }},
          scales: { xAxes: [{ gridLines: { display:false }, ticks: { autoSkip: true, maxTicksLimit: 7, maxRotation: 0, minRotation: 0}}], 
          yAxes: [{ gridLines: { display:false }, ticks: { maxTicksLimit: 1, maxRotation: 0, minRotation: 0, 
            callback: function(value, index, values) {
                        return '$' + (parseFloat(value).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          }}}]},
          legend: { display: false },
          lineTension: 0,
          elements: { point: { radius: 0, pointStyle: 'cross', hitRadius: 10, hoverRadius: 10 } }
          }} height={56} width={100}/>
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

