import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Movies from './pages/Movies'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

const App = ({ classes }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <CssBaseline />
      <AppHeader />
      <main className={classes.main}>
        <Route exact path='/' component={Home} />
        <Route exact path='/movies' component={Movies} />
      </main>
    </Fragment>
  </ThemeProvider>
);

export default withStyles(styles)(App);