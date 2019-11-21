import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    typography: {
      fontFamily: 'source-code-pro'
    }
  }
}));

export default function OutputSection({ display }) {
  const classes = useStyles();

  return (
    <div className='output-section'>
      <div className='output-buttons'>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}>
          Save to File.txt
        </Button>
      </div>
      <TextField
        disabled
        id="outlined-multiline-static"
        label="Output display"
        multiline
        rows="30"
        className={classes.textField + 'code'}
        margin="normal"
        variant="outlined"
        value={ display }
      />
    </div>
  );
}