import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const UpdateDelete = ({ updateQuantity, handleUpdateClick }) => (
  <div>
    <TextField
      type="number"
      min="0"
      hintText="Update Quantity"
      onChange={updateQuantity}
    />
    <RaisedButton
      label="Update"
      primary
      onClick={handleUpdateClick}
    />
      &nbsp;OR&nbsp;
    <RaisedButton
      label="Delete"
      primary
      onClick={handleUpdateClick}
    />
  </div>
);

export default UpdateDelete;
