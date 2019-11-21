import React, { useState } from 'react';
import './App.css';
import InputSection from "./components/inputSection";
import OutputSection from "./components/outputSection";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Compilator from './ultils/Compilator';

const reader = new FileReader();
const compilator = new Compilator();

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    background: '#efefef',
    file: null,
  },
}));

const defaultState = {
  input: null,
  output: null,
  instructions: 'C 20 4',
  display: `----------------------
|                    |
|                    |
|                    |
|                    |
----------------------`

};

function App() {
  const [ state, setState ] = useState(defaultState);
  const classes = useStyles();

  reader.onload = () => {
    console.log(state, reader.result);
    setState( { ...state, instructions: reader.result });
    console.log(state, reader.result);
  };

  const handleInputChange = e => {
    const instructions = e.nativeEvent.target.value;

    setState({...state, instructions});
  };

  const handleFileLoad = (file, e) => {
    console.log(file[0], e.nativeEvent);
    setState({ ...state, file: file[0] });
    reader.readAsText(file[0]);
    e.nativeEvent.target.value = '';
  };

  const handleRun = () => {
    console.log(state.instructions);
    const result = compilator.compile(state.instructions);
    setState({...state, display: result ? result : 'Render error'});
  };

  return (
    <div className="App">
      <Paper className={classes.root}>
        <InputSection handleFileLoad={handleFileLoad}
                      handleInputChange={handleInputChange}
                      handleRun={handleRun}
                      instructions={state.instructions}/>
        <OutputSection display={state.display}/>
      </Paper>
    </div>

  );
}

export default App;
