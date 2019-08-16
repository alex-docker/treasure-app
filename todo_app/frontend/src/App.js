import React from 'react';
import Tasks from './components/Tasks';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="regular">
          <Typography variant="h5" color="inherit">
            TODO リスト
          </Typography>
        </Toolbar>
      </AppBar>
      <Tasks></Tasks>
    </div>
  );
}

export default App;
