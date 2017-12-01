import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const UpdateDelete = () => {
  return (
    <div>
      <TextField type="number" min="0" hintText="Update Quantity" />
    </div>
  )
}

export default UpdateDelete;