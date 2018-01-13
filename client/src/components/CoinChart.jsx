import React from 'react';
import ReactDOM from 'react-dom';
import {Pie, Line, Bar, defaults} from 'react-chartjs-2';
defaults.global.defaultFontFamily = 'minecraft';
defaults.global.defaultFontSize = 14;

class CoinChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="graphBoard" className="">
        <div className="">
          <Line height="500px" data={this.props.chartData} options={{
            responsive: true, 
            maintainAspectRatio: false, 
            scales: { xAxes: [{ gridLines: { display:false }, ticks: { autoSkip: true, maxTicksLimit: 7, maxRotation: 0, minRotation: 0}}], 
              yAxes: [{ gridLines: { display:true }, ticks: { maxTicksLimit: 4, maxRotation: 0, minRotation: 0, 
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

export default CoinChart;