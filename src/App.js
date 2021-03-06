import React, { useState } from 'react';
import './App.css';
import InputSection from "./components/inputSection";
import OutputSection from "./components/outputSection";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Compilator from './ultils/Compilator';
import FileManager from "./ultils/FileManager";

const compilator = new Compilator();


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    background: '#efefef',
  },
}));

const defaultState = {
  instructions: 'C 20 4',
  display:
`----------------------
|                    |
|                    |
|                    |
|                    |
----------------------`
};

function App() {
  const classes = useStyles();

  const [ state, setState ] = useState(defaultState);

  const fileManager = new FileManager(() => {
    setState( { ...state, instructions: fileManager.result });
  });

  const handleInputChange = e => {
    const instructions = e.nativeEvent.target.value;

    setState({...state, instructions});
  };

  const handleFileLoad = (file, e) => {
    fileManager.readAsText(file[0]);

    e.nativeEvent.target.value = '';
  };

  const handleSaveFile = () => {
    fileManager.saveFileAsTxt(state.display);
  };

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
