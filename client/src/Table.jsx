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
      showUpdateDelete: true,
      selected: '',
    }
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  handleRowSelection(sel) {
    let timeStamp = this.props.occurrences[sel].timestamp;
    this.setState({
      selected: sel,
      time: timeStamp
    });
  }

  isSelected(i) {
    return this.state.selected.indexOf(i) !== -1;
  }

  handleModify() {
    // show number input field
    // show update button
    // show delete button
    // query: username, habit name, timestamp
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

        <RaisedButton label="Modify" primary={true} onClick={this.handleModify} />
        {this.state.showUpdateDelete ?
          <UpdateDelete />
          : null
        }
      </div>
    )
  }
};

export default MuiTable;