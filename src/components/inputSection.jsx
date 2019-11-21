import React, {useState} from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputFiles from 'react-input-files';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));


export default function InputSection({ handleInputChange, handleFileLoad, instructions, handleRun }) {
  const classes = useStyles();

  return (
    <div className='input-section'>
      <div className='input-buttons'>
        <InputFiles
          onChange={handleFileLoad}
          accept="*">
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}>
            Load instructions
          </Button>
        </InputFiles>

        <Button
          onClick={handleRun}
          variant="outlined"
          color="secondary"
          className={classes.button}>
          Run
        </Button>
      </div>
      <TextField
        id="outlined-multiline-static"
        label="Instructions"
        multiline
        rows="30"
        className={classes.textField + ' code'}
        margin="normal"
        variant="outlined"
        value={instructions}
        onChange={handleInputChange}
      >
      </TextField>
    </div>
  );
}
