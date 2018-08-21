import React, { Component } from 'react';
import RegisterPage from './components/container/RegisterPage/RegisterPage';
//Use createMuiTheme to create a mui theme.
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';

import Nav from './components/presentational/Nav/Nav';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: '#3f46ad',
        color: '#2c2d30'
      }
    },
    MuiTypography: {
      root: {
        color: '#2c2d30'
      }
    }
  },
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Nav />
          <header>React Message</header>
          <RegisterPage />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
