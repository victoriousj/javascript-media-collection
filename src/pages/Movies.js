import React, { useEffect, useState } from 'react';
import {
  Typography, ListItemText, List, ListItem, Divider, makeStyles
} from '@material-ui/core';

import { getData } from '../helpers';

const useStyles = makeStyles((theme) => ({
  item: {
    width: '100%',
    // maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
}));

const Movies = () => {
  const [movies, setMovies] = useState({
    loading: true,
    media: [],
    error: null,
  });

  useEffect(() => {
    const fetchMovies = (async () => {
      const json = await getData('get', 'movies');
      setMovies({ loading: false, media: json || [] })
    })
    fetchMovies()
  }, []);

  const media = movies.media;
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4">Movie List</Typography>
      {media.length ? (
        <List>
          {media.map(media => (
            <ListItem className={classes.item} key={media.id} button>
              <ListItemText primary={media.title} />
              <Divider />
            </ListItem>
          ))}
        </List>
      ) : <Typography variant="subtitle1">{movies.loading ? 'Loading...' : 'No posts to display'}</Typography>
      }
    </div>)
}

export default Movies;