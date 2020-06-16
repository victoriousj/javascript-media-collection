import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom'

import plex from '../plex.svg'

function AppHeader() {
  return (
    <AppBar position="static" style={{ backgroundColor: '#303030' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <img style={{ height: 15 }} src={plex} />
          <Typography display="inline" variant="h6" color="inherit">
            &nbsp;MEDIA LIBRARY
          </Typography>
        </div>
        <div>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/movies">Movies</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;