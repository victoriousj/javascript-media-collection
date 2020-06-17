import React, { useEffect, useState } from 'react';
import {
  Typography,
  ListItemText,
  List,
  ListItem,
  makeStyles,
  Paper,
  TextField
} from '@material-ui/core';

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import { getData } from '../helpers';
import Details from './Details';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: '#000',
  },
  searchInput: {
    width: '18vw',
    padding: '10px 20px 5px 10px',
    backgroundColor: '#222'
  },
  movieList: {
    width: '18vw',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    borderLeft: '10px solid #222',
    padding: 0,
  },
  movieItem: {
    fontSize: '12px',
    backgroundColor: '#222',
    borderBottom: '1px solid rgba(255,255,255, 0.2)',
  },
  details: {
    marginTop: 50,
    marginLeft: '10%',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,0.3)'
  }
}));

const Movies = () => {
  const [movies, setMovies] = useState({
    media: [],
    error: null,
    loading: true,
    selectedMediaId: 0,
  });

  useEffect(() => {
    const fetchMovies = (async () => {
      const json = await getData('get', 'movies');

      setMovies({
        loading: false,
        media: json || [],
        selectedMediaId: 285
      });
    })
    fetchMovies();
  }, []);

  async function searchInput(query) {
    const json = await getData('get', `movies/${query}`);
    setMovies({
      loading: false,
      media: json || [],
      selectedMediaId: 0
    });
  };

  const { selectedMediaId, media } = movies;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <TextField
          className={classes.searchInput}
          placeholder="&nbsp;Search..."
          onChange={e => searchInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }} />
        <Paper style={{ height: '93%', borderRadius: 0, borderTop: '10px solid #222' }} >
          {
            media.length ? (
              <List className={classes.movieList}>
                {media.map(media => (
                  <ListItem
                    button
                    key={media.id}
                    className={`${classes.movieItem}`}
                    selected={selectedMediaId === media.id ? true : false}
                    onClick={() => setMovies(prevState => { return { ...prevState, selectedMediaId: media.id } })
                    }>
                    <ListItemText primary={media.title} />
                  </ListItem>
                ))}
              </List>
            ) : <Typography variant="subtitle1">{movies.loading ? 'Loading...' : 'No posts to display'}</Typography>
          }
        </Paper>
      </div>
      <div style={{ width: '100%', overflow: 'scroll' }}>
        {selectedMediaId !== 0 && <Details id={movies.selectedMediaId} />}
      </div>
    </div >
  )
}

export default Movies;