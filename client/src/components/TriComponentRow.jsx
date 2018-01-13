import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'semantic-ui/dist/semantic.min.js';
import 'semantic-ui/dist/semantic.min.css';

const TriComponentRow = (props) => {
  $('#first').transition('set looping').transition('bounce', '2000ms')
  return (
    <div className="five column row">
      <div className='column'></div>
      <div id="first" style={{}} className="column">
        <span className="tab" className="small">$</span>
        <span className="tab" className="medium">{parseFloat(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1]).toFixed(2)}</span>
        <p>{props.state.coins[props.state.currentCoin - 1][0] + ' Price'}</p>
      </div>
      <div style={{}} className="column">
        <span className="plus_minus medium">{(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0])) > 0 ? '+' : '-' }</span>
        <span className="small">$</span>
        <span className="medium">{Math.abs(parseFloat(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0]))).toFixed(2)}</span>
        <p>{props.state.labels[props.state.currentTimePeriod][3] + ' (USD)'}</p>
      </div>
      <div style={{}} className="column">
        <span className="plus_minus medium">{(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0])) > 0 ? '+' : '-' }</span>
        <span className="medium">{Math.abs(100*(parseInt(props.state.chartData.datasets[0].data[props.state.chartData.datasets[0].data.length-1])-parseInt(props.state.chartData.datasets[0].data[0]))/parseInt(props.state.chartData.datasets[0].data[0])).toFixed(2)}</span>
        <span className="small">%</span>
        <p>{props.state.labels[props.state.currentTimePeriod][3] + ' (%)'}</p>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default TriComponentRow;
