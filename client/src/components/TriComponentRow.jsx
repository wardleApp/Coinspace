import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'semantic-ui/dist/semantic.min.js';
import 'semantic-ui/dist/semantic.min.css';

const TriComponentRow = (props) => {
  return (

    <div id="currencyDisplay" className="centered">
      <div className='column'></div>
      <div style={{}} className="column">
        <span className="large">${parseFloat(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1]).toFixed(2)}</span>
        <p className="small">{props.state.coins[props.state.currentCoin - 1][0] + ' Price'}</p>
      </div>

      <div style={{}} className="column">
        <span className="plus_minus medium">{(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0])) > 0 ? '+' : '-' }</span>
        <span className="large">${Math.abs(parseFloat(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0]))).toFixed(2)}</span>
        <p className="small">{props.state.labels[props.state.currentTimePeriod][3] + ' (USD)'}</p>
      </div>

      <div style={{}} className="column">
        <span className="plus_minus medium">{(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0])) > 0 ? '+' : '-' }</span>
        <span className="large">{Math.abs(100*(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0]))/parseInt(props.state.chartData.datasets[0].data[0])).toFixed(2)} %</span>
        <p className="small">{props.state.labels[props.state.currentTimePeriod][3] + ' (%)'}</p>
      </div>
      <div className='column'></div>

    </div>
  );
};

export default TriComponentRow;