import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class EventCreator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      currentTimeframe : 'Day',
      event: '',
      units: '',
      limit: '',
      value: 0,
    }
    this._timeframes = ['Day', 'Week', 'Month'];
    this.changeTimeframe = this.changeTimeframe.bind(this);
    this.elementChange = this.elementChange.bind(this);
  }

  elementChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // for SelectField drop down change and select handling
  changeTimeframe(e, index) {
    this.setState({
      value: index,
      currentTimeframe: this._timeframes[index],
    });
  }

  render() {
    const style = {
      marginLeft: 20,
    };
    return (
      <div className="eventCreator">
      <h1>Habit Creator</h1>
      <Paper zDepth={1} style={{width: '50%'}}>
        <TextField hintText="Habit name" style={style} underlineShow={false} onChange={this.elementChange} name="event"/>
        <Divider />
        <TextField hintText="Habit units" style={style} underlineShow={false} onChange={this.elementChange} name="units"/>
        <Divider />
        <TextField type="number" hintText="Goal" style={style} underlineShow={false} onChange={this.elementChange} name="limit"/>
        <Divider />
      </Paper>
        <SelectField
          floatingLabelText="Choose Timeframe"
          value={this.state.value}
          onChange={this.changeTimeframe}
        >
        {this._timeframes.map((timeframe, index) =>
          <MenuItem key={index} value={index} primaryText={timeframe} />
        )}

        </SelectField>
        <br />
        <br />
        <RaisedButton label="Create Habit" primary={true} onClick={this.props.createHabit.bind(this, this.state.event, this.state.units, this.state.limit, this.state.currentTimeframe) } />

        <RaisedButton label="Log Data" primary={true} onClick={this.props.changeCreateHabitView} />
        <hr />
      </div>
    )
  }
}

export default EventCreator;