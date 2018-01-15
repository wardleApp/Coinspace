import React from 'react';
import ReactDOM from 'react-dom';
import {Pie, Line, Bar, defaults} from 'react-chartjs-2';

class CoinChartCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.currentCoinData)
  }

  render() {
    return (
      <div id="dashCard" className="ui blue raised card" name='Graph' onClick={this.props.changeLayout}>
        <div className="content">
        {this.props.currentCoinData.currentCoin === 1 ? <h2 className="header">Selected Bitcoin Chart</h2> : 
        this.props.currentCoinData.currentCoin === 2 ? <h2 className="header">Selected Ethereum Chart</h2> :
        this.props.currentCoinData.currentCoin === 3 ? <h2 className="header">Selected Litecoin Chart</h2> : <h2 className="header">Selected Ripple Chart</h2>}
          <div className="ui divider"></div> 
          <Line data={this.props.chartData} options={{
            responsive: true, 
            scales: { xAxes: [{ gridLines: { display:false }, ticks: { autoSkip: true, maxTicksLimit: 7, maxRotation: 0, minRotation: 0}}], 
              yAxes: [{ gridLines: { display:false }, ticks: { maxTicksLimit: 1, maxRotation: 0, minRotation: 0, 
                callback: function(value, index, values) {
                  return '$' + (parseFloat(value).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                }}}]},
            legend: { display: false },
            lineTension: 0,
            elements: { point: { radius: 0, pointStyle: 'cross', hitRadius: 10, hoverRadius: 10 } }
          }}/>
        </div>
      </div>
    );
  }
}

export default CoinChartCard;