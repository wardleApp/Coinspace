import React from 'react';
import {Pie, Line, Bar, defaults} from 'react-chartjs-2';

const CoinChart = (props) => {
  const chartData = {
    labels: props.state.chartLabels,
    datasets: [{
      label: 'Price',
      data: props.state.chartDataSet,
      backgroundColor: props.state.chartBGcolor,
      borderColor: props.state.chartBorderColor
    }]
  };
  return (
    <div id="graphBoard">
      <div>
        <Line height={300} width={150} data={chartData} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                gridLines: { display:false },
                ticks: {
                  fontFamily: "Arial",
                  autoSkip: true,
                  maxTicksLimit: 7,
                  maxRotation: 0,
                  minRotation: 0
                }
              }],
              yAxes: [{
                gridLines: { display:false },
                ticks: {
                  fontFamily: "Arial",
                  maxTicksLimit: 3,
                  maxRotation: 0,
                  minRotation: 0,
                  callback: value => '$' + value.toLocaleString()
                }
              }]
            },
            legend: { display: false },
            lineTension: 0,
            elements: { point: { radius: 0, pointStyle: 'cross', hitRadius: 10, hoverRadius: 10 } }
          }}/>
        </div>
      </div>
  );
}

export default CoinChart;
