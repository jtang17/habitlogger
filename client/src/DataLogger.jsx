import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';

class DataLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHabit: '',
      habitTime: new Date(),
      quantity: '',
      value: 0,
    };
    this.habitChange = this.habitChange.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.checkDupe = this.checkDupe.bind(this);
  }

  // shows 'Select Habit' as placeholder for select dropdown
  // rather than as floating text
  componentWillMount() {
    this.habitChange();
  }

  habitChange(e, index) {
    this.setState({
      currentHabit: this.props.habits[index],
      value: index,
    });
  }

  dateChange(e, date) {
    this.setState({habitTime: date});
  }

  quantityChange(e) {
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
      }
    });

    if (found) {
      alert('Please make any updates to existing logs by updating your table');
    } else {
      this.props.logHabit(habit, time, quantity);
    }
  }

  render() {
    return (
      <div className="dataLogger">

        <h1>Data Logger</h1>

        <SelectField
          floatingLabelText="Select Habit"
          value={this.state.value}
          onChange={this.habitChange}>
          {this.props.habits.map((event, index)=>{
            return <MenuItem key={index} value={index} primaryText={event} />
          })}
        </SelectField>
        <br />

        <DatePicker autoOk={true}
                    hintText="Select Date"
                    container="inline"
                    mode="landscape"
                    value={this.state.habitTime}
                    onChange={(x, day) => this.dateChange(x,day)} />

        <input type="number" onChange={this.quantityChange} />

        <button onClick={this.checkDupe} >Log Habit</button>
      </div>
    )
  }
}

export default DataLogger;
