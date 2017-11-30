import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

class DataLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHabit: '',
      habitTime: new Date(),
      quantity: '',
      value: 0,
    };
    this.logChange = this.logChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.checkDupe = this.checkDupe.bind(this);
  }

  // used to have 'Select Habit' placeholder text in drop down menu on mount
  componentWillMount() {
    this.logChange();
  }

  logChange(e, index) {
    this.setState({
      currentHabit: this.props.habits[index],
      value: index,
    });
  }

  handleDateChange(e, date) {
    this.setState({habitTime: date});
  }

  handleQuantityChange(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  /*
    Uses timestamps to check if a log/entry is a duplicate.
    We don't want more than one log to have the same date
    because it messes up the chart.
  */
  checkDupe() {
    let occurrences = this.props.occurrences;
    let habit = this.state.currentHabit;
    let time = JSON.parse(JSON.stringify(this.state.habitTime));
    let quantity = this.state.quantity;
    let found = false;

    occurrences.forEach(item => {
      if (item.timestamp.slice(0, 10) === time.slice(0, 10)) {
        found = true;
      } else {
        this.props.logHabit(habit, time, quantity);
      }
    });

    alert('Please make any updates to existing logs by updating your table');
  }

  render() {
    return (
      <div className="dataLogger">
        <h1>Data Logger</h1>
        <SelectField
          floatingLabelText="Select Habit"
          value={this.state.value}
          onChange={this.logChange}>
          {this.props.habits.map((event, index)=>{
            return <MenuItem key={index} value={index} primaryText={event} />
          })}
        </SelectField>
        <br />
        <DatePicker autoOk={true} hintText="Select Date" container="inline" mode="landscape" value={this.state.habitTime} onChange={(x, day) => this.handleDateChange(x,day)} />
        <input type="number" onChange={this.handleQuantityChange} />
        <button onClick={this.checkDupe} >Log Habit</button>
      </div>
    )
  }
}

export default DataLogger;
