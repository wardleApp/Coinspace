import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'semantic-ui/dist/semantic.min.js';
import 'semantic-ui/dist/semantic.min.css';

const TriComponentRow = (props) => {
  $('#first').transition('set looping').transition('bounce', '2000ms')
  return (

    <div className="five column row">

     <div id="currencyDisplay" className="centered">
        
        <div>
          <span className="tab medium">$</span>
          <span className="tab large">{parseFloat(props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1]).toFixed(2)}</span>
          <p className="small">{props.currentCoin === 1 ? 'Bitcoin Price' : 
              props.currentCoin === 2 ? 'Ethereum Price' :
              props.currentCoin === 3 ? 'Litecoin Price' : 'Ripple Price'}
          </p>
        </div>
        
        <div>
          <span className="plus_minus medium">{(parseInt(props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1])-parseInt(props.chartData.datasets[0].data[0])) > 0 ? '+' : '-' }</span>
          <span className="medium">$</span>
          <span className="large">{Math.abs(parseFloat(parseInt(props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1])-parseInt(props.chartData.datasets[0].data[0]))).toFixed(2)}</span>
          <p className="small">{props.currentTimePeriod === '1H' ? 'Past Hour (USD)' : 
            props.currentTimePeriod === '1D' ? 'Since Yesterday (USD)' :
            props.currentTimePeriod === '1W' ? 'Since Last Week (USD)' :
            props.currentTimePeriod === '1M' ? 'Since Last Month (USD)' :
            props.currentTimePeriod === '1Y' ? 'Since Last Year (USD)' : 'Since Forever (USD)'}
          </p>
        </div>

        <div>
          <span className="plus_minus medium">{(parseInt(props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1])-parseInt(props.chartData.datasets[0].data[0])) > 0 ? '+' : '-' }</span>
          <span className="large">{Math.abs(100*(parseInt(props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1])-parseInt(props.chartData.datasets[0].data[0]))/parseInt(props.chartData.datasets[0].data[0])).toFixed(2)}</span>
          <span className="medium">%</span>
          <p className="small">{props.currentTimePeriod === '1H' ? 'Past Hour (%)' : 
            props.currentTimePeriod === '1D' ? 'Since Yesterday (%)' :
            props.currentTimePeriod === '1W' ? 'Since Last Week (%)' :
            props.currentTimePeriod === '1M' ? 'Since Last Month (%)' :
            props.currentTimePeriod === '1Y' ? 'Since Last Year (%)' : 'Since Forever (%)'}
          </p>
          
        </div>

    </div>

    </div>
  );
};

export default TriComponentRow;