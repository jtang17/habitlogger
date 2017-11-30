import React from 'react';
import {Line} from 'react-chartjs-2';
import moment from 'moment';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels : this.compileEntryLabels(this.sortDates()),
      data : this.compileEntryValues(this.sortDates()),
      unit : this.props.unit,
      timeframe: 0
    };
    this._maxDate;
    this._minDate;
    this._options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }],
        xAxes: [{
          type: 'linear',
          ticks: {
             suggestedMin: 0,
             suggestedMax: this._maxDate,
             stepSize: this._maxDate / 10 //interval between ticks
          }
       }]
      }
    };
    this.compileEntryLabels = this.compileEntryLabels.bind(this);
    this.compileEntryValues = this.compileEntryValues.bind(this);
    this.setData = this.setData.bind(this);
    this.sortDates = this.sortDates.bind(this);
  }

  componentDidMount() {
    this.setData(this.state.labels, this.state.data, this.state.unit);
  }

  // set entries of chart data - currently set to 15 entries
  getLastXOccurrences(entries, x = 15) {
    if (entries.length > x) {
      return entries.slice(entries.length - x);
    } else {
      return entries;
    }
  }

  //Uses the sorted and filtered occurrence array that contains timestamp and value (X Axis)
  compileEntryLabels(entries) {
    entries = this.getLastXOccurrences(entries);

    return entries.map((entry) => {
      return this.props.timeframe + " of " + moment(entry.timestamp).format('MMM Do YYYY');
    });
  }

  // getting data to be displayed on chart (Y Axis)
  compileEntryValues(entries) {
    let day1 = undefined;
    let xDay = undefined;
    let timeframe = 0;
    const dayInMill = 24 * 3600 * 1000;
    entries = this.getLastXOccurrences(entries);

    let arr = entries.map((entry) => {
      if (!day1) {
        day1 = Date.parse(entry.timestamp);
        xDay = 0;
      } else {
        xDay = (Date.parse(entry.timestamp) - day1) / dayInMill;
      }
      if (!timeframe || xDay > timeframe) {
        this._maxDay = Math.round(xDay);
      }
      return { x: xDay, y: entry.value };
    });
    this.setState({
      timeframe: timeframe
    });
    return arr;
  }

  // should be unnecessary as occurrences data is sorted by database/server now - need to refactor out
  sortDates () {
    return this.props.occurrences.sort((a,b)=>{
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
  }

  // need to re-factor to get table to update/render properly
  setData (lab,dat,uni) {
    this.setState(  {data:
                     {
                       // labels: lab,
                       datasets: [
                         {
                           label: uni,
                           fill: false,
                           lineTension: 0.1,
                           backgroundColor: 'rgba(75,192,192,0.4)',
                           borderColor: 'rgba(75,192,192,1)',
                           borderCapStyle: 'butt',
                           borderDash: [],
                           borderDashOffset: 0.0,
                           borderJoinStyle: 'miter',
                           pointBorderColor: 'rgba(75,192,192,1)',
                           pointBackgroundColor: '#fff',
                           pointBorderWidth: 1,
                           pointHoverRadius: 5,
                           pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                           pointHoverBorderColor: 'rgba(220,220,220,1)',
                           pointHoverBorderWidth: 2,
                           pointRadius: 1,
                           pointHitRadius: 10,
                           data: dat,
                         }
                       ]
                     }});
  }

  render() {
    return (
      <div id="chart">
        <h3>{this.props.habit} over the past {this._maxDay} days</h3>
        <Line data={this.state.data} options={this._options}/>
      </div>
    );
  }
}

export default Chart;
