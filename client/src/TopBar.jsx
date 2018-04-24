import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppBar
          className="appBar"
          title="Habit Logger"
          iconElementRight={this.props.loggedIn ? <FlatButton style={{ color: 'white' }} label="Signout" onClick={this.props.logout} /> : null}
          showMenuIconButton={false}
        />
      </div>
    );
  }
}

export default TopBar;
