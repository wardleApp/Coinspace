import React from 'react';
import ReactDOM from 'react-dom';
import {Pie, Line, Bar, defaults} from 'react-chartjs-2';

class CoinChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="graphBoard">
        <div>
          <Line height={300} width={150} data={this.props.chartData} options={{
            responsive: true, 
            maintainAspectRatio: false, 
            scales: { xAxes: [{ gridLines: { display:false }, ticks: {fontFamily: "Avenir Next", autoSkip: true, maxTicksLimit: 7, maxRotation: 0, minRotation: 0}}], 
              yAxes: [{ gridLines: { display:false }, ticks: {fontFamily: "Avenir Next", maxTicksLimit: 3, maxRotation: 0, minRotation: 0, 
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