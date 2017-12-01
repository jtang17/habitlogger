import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const UpdateDelete = ({ quantity, handleModify, updateQuantity }) => {
  return (
    <div>
      <TextField type="number"
                 min="0"
                 hintText="Update Quantity"
                 onChange={updateQuantity} />
      <RaisedButton label="Update"
                    primary={true}
                    onClick={handleModify} />
      &nbsp;OR&nbsp;
      <RaisedButton label="Delete"
                    primary={true}
                    onClick={handleModify} />
    </div>
  )
}

export default UpdateDelete;