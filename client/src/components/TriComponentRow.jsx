import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'semantic-ui/dist/semantic.min.js';
import 'semantic-ui/dist/semantic.min.css';

const TriComponentRow = (props) => {
  $('#first').transition('set looping').transition('bounce', '2000ms')
  return (

    <div id="currencyDisplay" className="centered">
      <div className='column'></div>
      <div id="first" style={{}} className="column">
        <span className="tab medium">$</span>
        <span className="tab large">{parseFloat(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1]).toFixed(2)}</span>
        <p className="small">{props.state.coins[props.state.currentCoin - 1][0] + ' Price'}</p>
      </div>

      <div style={{}} className="column">
        <span className="plus_minus medium">{(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0])) > 0 ? '+' : '-' }</span>
        <span className="medium">$</span>
        <span className="large">{Math.abs(parseFloat(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0]))).toFixed(2)}</span>
        <p className="small">{props.state.labels[props.state.currentTimePeriod][3] + ' (USD)'}</p>
      </div>

      <div style={{}} className="column">
        <span className="plus_minus medium">{(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0])) > 0 ? '+' : '-' }</span>
        <span className="large">{Math.abs(100*(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0]))/parseInt(props.state.chartData.datasets[0].data[0])).toFixed(2)}</span>
        <span className="medium">%</span>
        <p className="small">{props.state.labels[props.state.currentTimePeriod][3] + ' (%)'}</p>
      </div>
      <div className='column'></div>

    </div>
  );
};

export default TriComponentRow;