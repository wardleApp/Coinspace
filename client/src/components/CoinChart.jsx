import React from 'react';
import ReactDOM from 'react-dom';
import {Pie, Line, Bar} from 'react-chartjs-2';

class CoinChart extends React.Component {
	constructor(props) {
		super(props)
  }

  onClickHandle(e) {
    this.props.onSetData(e.target.value)
  }

  render(){
    return (
      <div className="chart">
      <div>
      <button value="BTC" onClick={this.onClickHandle.bind(this)}>Bitcoin</button>
      </div>
      <div>
      <button value="ETH" onClick={this.onClickHandle.bind(this)}>Ethereum</button>
      </div>
      <div>
      <button value="XRP" onClick={this.onClickHandle.bind(this)}>Ripple</button>
      </div>
      <div>
      <button value="LTC" onClick={this.onClickHandle.bind(this)}>Litecoin</button>
      </div>
        <Line data={this.props.chartData}/>
      </div>
    )
  }
}

export default CoinChart;





