import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import {
  CssBaseline,
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Movies from './pages/Movies'

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'body': {
          overflow: 'hidden',
          backgroundColor: '#111'
        },
        '*::-webkit-scrollbar': {
          width: '1.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
          backgroundColor: 'rgba(0,0,0,0.4)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,.05)',
          outline: '1px solid slategrey'
        }
      }
    }
  },
  palette: {
    type: 'dark'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <AppHeader />
        <main style={{ height: '95vh' }}>
          <Route exact path='/' component={Home} />
          <Route exact path='/movies' component={Movies} />
        </main>
      </Fragment>
    </ThemeProvider>
  );
}

export default App;