import React from 'react';
import UpdateDelete from './UpdateDelete.jsx';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  paper: {
    height: '640px',
    padding: '20px',
  },
};

class MuiTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '300px',
      time: '',
      quantity: '',
      showUpdateDelete: false,
      selected: '',
      errorText: '',
    };
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleModifyClick = this.handleModifyClick.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  handleRowSelection(sel) {
    const timeStamp = this.props.occurrences[sel].timestamp;
    this.setState({
      selected: sel,
      time: timeStamp,
    }, function () {
      console.log(this.state.time);
    });
  }

  isSelected(i) {
    return this.state.selected.indexOf(i) !== -1;
  }

  handleModifyClick() {
    if (this.state.selected !== '') {
      this.setState({
        showUpdateDelete: true,
        errorText: '',
      });
    } else {
      this.setState({ errorText: '** Please select a log to modify' });
    }
  }

  updateQuantity(e) {
    const val = e.target.value;
    this.setState({ quantity: val });
  }

  handleUpdateClick() {
    const time = this.state.time;
    const quantity = this.state.quantity;

    this.props.updateLogEntry(time, quantity);
  }

  render() {
    let article = 'a';
    let firstLetter;
    if (this.props.ranking) {
      const firstLetter = this.props.ranking.slice(0, 1).toUpperCase();
      if (firstLetter === 'A' || firstLetter === 'E' || firstLetter === 'I' || firstLetter === 'O' || firstLetter === 'U') {
        article = 'an';
      }
    }

    return (
      <div className="table">
        <Paper style={style.paper} zDepth={1}>
          <h1 className="tableName">You are {article} {this.props.ranking} at {this.props.habit}</h1>
          <h3 className="pointDisplay">You have earned {this.props.totalPoints} points!</h3>
          <h3 className="limitInfo">You set your goal to {this.props.limit} {this.props.unit} per {this.props.timeframe}</h3>
          <Table height={this.state.height} width={this.state.width} onRowSelection={this.handleRowSelection}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>{this.props.unit}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
              this.props.occurrences.map((occurence, index) => {
                const momentDate = moment(occurence.timestamp).format('MMM Do YYYY');
                return (
                  <TableRow key={occurence._id} selected={this.isSelected(index)}>
                    <TableRowColumn>{momentDate}</TableRowColumn>
                    <TableRowColumn>{occurence.value}</TableRowColumn>
                  </TableRow>
                );
              })
            }
            </TableBody>
          </Table>

          <RaisedButton label="Modify" primary onClick={this.handleModifyClick} />
          <p>{this.state.errorText}</p>
          {this.state.showUpdateDelete ?
            <UpdateDelete
              quantity={this.state.quantity}
              updateQuantity={this.updateQuantity}
              handleUpdateClick={this.handleUpdateClick}
            />
          : null
        }
        </Paper>
      </div>
    );
  }
}

export default MuiTable;
