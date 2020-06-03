import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  link: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  }
}));

const AppHeader = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar} >
        <div></div>
        <Typography variant="h6" color="inherit">
          Vic's Media Collection
        </Typography>
        <div>
          <Button color="inherit" className={classes.link} component={Link} to="/">Home</Button>
          <Button color="inherit" className={classes.link} component={Link} to="/movies">Movies</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;