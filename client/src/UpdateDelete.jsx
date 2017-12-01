import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const UpdateDelete = ({ quantity, updateQuantity, handleUpdateClick }) => {
  return (
    <div>
      <TextField type="number"
                 min="0"
                 hintText="Update Quantity"
                 onChange={updateQuantity} />
      <RaisedButton label="Update"
                    primary={true}
                    onClick={handleUpdateClick} />
      &nbsp;OR&nbsp;
      <RaisedButton label="Delete"
                    primary={true}
                    onClick={handleUpdateClick} />
    </div>
  )
}

export default UpdateDelete;