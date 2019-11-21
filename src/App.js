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
    setState( { ...state, instructions: reader.result });
  };

  const handleInputChange = e => {
    const instructions = e.nativeEvent.target.value;

    setState({...state, instructions});
  };

  const handleFileLoad = (file, e) => {
    reader.readAsText(file[0]);

    e.nativeEvent.target.value = '';
  };

  const handleSaveFile = () => {
    const file = new Blob([state.display], {type: 'txt'});

    const a = document.createElement("a"),

    url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'output';
    document.body.appendChild(a);
    a.click();

    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  const handleRun = () => {
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
        <OutputSection display={state.display}
                       handleSaveFile={handleSaveFile}/>
      </Paper>
    </div>

  );
}

export default App;
