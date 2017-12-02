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
import RaisedButton from 'material-ui/RaisedButton';

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
    }
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleModifyClick = this.handleModifyClick.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  handleRowSelection(sel) {
    let timeStamp = this.props.occurrences[sel].timestamp;
    this.setState({
      selected: sel,
      time: timeStamp
    }, function() {
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
      this.setState({ errorText: '** Please select a log to modify'});
    }
  }

  updateQuantity(e) {
    let val = e.target.value;
    this.setState({ quantity: val });
  }

  handleUpdateClick() {
    let time = this.state.time;
    let quantity = this.state.quantity;

    this.props.updateLogEntry(time, quantity);
  }

  render() {
    return (
      <div className="table">
        <h1 className="tableName">{this.props.habit}</h1>
        <h2 className="limitInfo">You set your goal to {this.props.limit} {this.props.unit} per {this.props.timeframe}</h2>
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
                let momentDate = moment(occurence.timestamp).format('MMM Do YYYY');
                return (
                  <TableRow key={occurence._id} selected={this.isSelected(index)}>
                    <TableRowColumn>{momentDate}</TableRowColumn>
                    <TableRowColumn>{occurence.value}</TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>

        <RaisedButton label="Modify" primary={true} onClick={this.handleModifyClick} />
        <p>{this.state.errorText}</p>
        {this.state.showUpdateDelete ?
          <UpdateDelete quantity={this.state.quantity}
                        updateQuantity={this.updateQuantity}
                        handleUpdateClick={this.handleUpdateClick} />
          : null
        }
      </div>
    )
  }
};

export default MuiTable;