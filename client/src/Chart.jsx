import React from 'react';
import { Line } from 'react-chartjs-2';
import Social from './SocialSharing.jsx';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this._maxDate;
    this._minDate;
    this._options;
    this.data;
    this.compileEntryValues = this.compileEntryValues.bind(this);
  }

  // set entries of chart data - currently set to 15 entries
  getLastXOccurrences(entries, x = 15) {
    if (entries.length > x) {
      return entries.slice(entries.length - x);
    }
    return entries;
  }

  // getting data to be displayed on chart (Y Axis)
  compileEntryValues(entries) {
    let day1;
    let xDay;
    const timeframe = 0;
    const dayInMill = 24 * 3600 * 1000;
    entries = this.getLastXOccurrences(entries);

    const arr = entries.map((entry) => {
      if (!day1) {
        day1 = Date.parse(entry.timestamp);
        xDay = 0;
      } else {
        xDay = Math.round((Date.parse(entry.timestamp) - day1) / dayInMill);
      }
      if (!timeframe || xDay > timeframe) {
        this._maxDay = Math.round(xDay);
      }
      return { x: xDay, y: entry.value };
    });
    this.data = {
      datasets: [
        {
          label: this.props.unit,
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#3D5AFE',
          borderColor: '#3D5AFE',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#3D5AFE',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#3D5AFE',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: arr,
        },
      ],
    };
    this._options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
        xAxes: [{
          type: 'linear',
          ticks: {
            suggestedMin: 0,
            suggestedMax: this._maxDate,
            stepSize: this._maxDate / 10, // interval between ticks
          },
        }],
      },
    };
  }

  render() {
    this.compileEntryValues(this.props.occurrences);
    const style = {
      appBar: {
        textAlign: 'center',
      },
    };
    return (
      <div id="chart">
        <Paper zDepth={1}>
          <AppBar title={`${this.props.habit} over the past ${this._maxDay} days`} style={style.appBar} showMenuIconButton={false} />
          <p>Share your progress!</p>
          <Social />
          <Line data={this.data} options={this._options} />
        </Paper>
      </div>
    );
  }
}

export default Chart;
