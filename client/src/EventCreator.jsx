import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

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
      eventCreator: {
        height: 420,
        width: 300,
        margin: '0 auto',
        textAlign: 'center',
        display: 'inline-block',
        position: 'relative'
      },
      logButton: {
        margin: 10,
        position: 'absolute',
        bottom: '50px',
        left: '10px'
      },
      createHButton: {
        margin: 10,
        position: 'absolute',
        bottom: '50px',
        right: '10px'
      },
      appBar: {
        textAlign: 'center'
      }
    };
    return (
      <div className="eventCreator">
        <Paper style={style.eventCreator} zDepth={1} >
          <AppBar title="Habit Creator" style={style.appBar} showMenuIconButton={false} />

          <TextField hintText="Habit name"  underlineShow={false} onChange={this.elementChange} name="event"/>
          <Divider />
          <TextField hintText="Habit units" underlineShow={false} onChange={this.elementChange} name="units"/>
          <Divider />
          <TextField type="number" hintText="Goal" underlineShow={false} onChange={this.elementChange} name="limit"/>
          <Divider />
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
          <RaisedButton label="Create Habit" primary={true} onClick={this.props.createHabit.bind(this, this.state.event, this.state.units, this.state.limit, this.state.currentTimeframe) }
            style={style.logButton} />

          <RaisedButton label="Log Data" primary={true} onClick={this.props.changeCreateHabitView} style={style.createHButton} />
          <hr />
        </Paper>
      </div>
    )
  }
}

export default EventCreator;