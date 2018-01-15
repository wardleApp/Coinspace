import React from 'react';
import {Pie, Line, Bar, Doughnut, defaults} from 'react-chartjs-2';
defaults.global.defaultFontFamily = 'minecraft';
defaults.global.defaultFontSize = 14;

class TotalAllocations extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    const data = {
      labels: [
        'BitCoin',
        'Ethereum',
        'LiteCoin'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#4FC7FF',
          '#f2b632',
          '#2ECC71'
        ],
        hoverBackgroundColor: [
          '#4FC7FF',
          '#f2b632',
          '#2ECC71'
        ]
      }]
    };
    return (
      <div id="dashCard" className="ui blue raised card">
        <div className="content">
          <h2 className="header">Total Allocations</h2>
          <div className="ui divider"></div> 
          <Doughnut data={data} options={{
            responsive: true}} />
        </div>
      </div>
    );
  }
}

export default TotalAllocations;