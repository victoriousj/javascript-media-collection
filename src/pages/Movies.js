import React, { useEffect, useState } from 'react';
import {
  Typography, ListSubheader, ListItemText, List, ListItem, makeStyles, Paper, TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'

import { getData } from '../helpers';
import Details from './Details';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: '10px',
    display: 'flex',
    backgroundColor: '#111',
    height: '100%'
  },
  movieList: {
    width: '18vw',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
  },
  movieItem: {
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  details: {
    marginLeft: '10%',
    marginTop: 50
  },
  active: {
    backgroundColor: 'rgba(255,255,255,0.3)'
  }
}));

const Movies = () => {
  const [movies, setMovies] = useState({
    loading: true,
    media: [],
    selectedMediaId: 0,
    error: null,
  });

  useEffect(() => {
    const fetchMovies = (async () => {
      const json = await getData('get', 'movies');
      setMovies({ loading: false, media: json || [], selectedMediaId: 0 })
    })
    fetchMovies();
  }, []);

  const { selectedMediaId, media } = movies;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <Autocomplete
          size="small"
          options={media.sort((a, b) => -b.title[0].localeCompare(a[0]))}
          forcePopupIcon={false}
          groupBy={(option) => option[0]}
          getOptionLabel={(movie) => movie.title}
          renderInput={(params) => <TextField {...params} label="&nbsp;&nbsp;Movies" variant="standard" />}
          onChange={(e, value) => setMovies(prevState => {
            return { ...prevState, selectedMediaId: value ? value.id : 0 }
          })}
        />

        <Paper style={{ height: '94%' }} >
          {
            media.length ? (
              <List className={classes.movieList} >
                {media.map(media => (
                  <ListItem selected={selectedMediaId === media.id ? true : false} className={`${classes.movieItem}`} key={media.id} button onClick={() => setMovies(prevState => { return { ...prevState, selectedMediaId: media.id } })}>
                    <ListItemText primary={media.title} />
                  </ListItem>
                ))}
              </List>
            ) : <Typography variant="subtitle1">{movies.loading ? 'Loading...' : 'No posts to display'}</Typography>
          }
        </Paper>
      </div>
      <div style={{ height: '70vh', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {selectedMediaId !== 0 && <Details id={movies.selectedMediaId} />}
      </div>
    </div >
  )
}

export default Movies;