import React, { useState, useEffect } from 'react'
import {
  Typography, Divider, makeStyles
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import RunTime from '../components/RunTime';
import IMDBLink from '../components/IMDBLink';

import { getData, getMovieDBData } from '../helpers';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
    width: '100%'
  },
  body: {
    width: '800px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '40px 60px',
    borderRadius: '5px',
    boxShadow: '0px 5px 5px rgba(0,0,0,0.2)',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  year: {
    font: '25px Arial,sans-serif',
    color: 'rgb(198, 194, 186)',
  },
  titleText: {
    font: '24px Arial,sans-serif',
    fontWeight: 'normal',
    lineHeight: '110%',
    margin: '0px',
    paddingBottom: '5px',
  },
  movieImages: {
    display: 'flex',
    margin: '8px 0 20px',
    justifyContent: 'center',
  },
  poster: {
    height: '262px',
    marginRight: '20px',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  backdropImage: {
    height: '262px',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));


function Details({ id }) {
  const [details, setDetails] = useState({
    loading: true,
    movie: {},
    error: null,
  });

  const movieId = id;

  useEffect(() => {
    const fetchMovieDetails = (async () => {
      let movieDetails = await getData('get', `movie/${movieId}`);
      if (movieDetails !== null) {
        const movieDB = await getMovieDBData(movieDetails.title, movieDetails.year);
        movieDetails = { ...movieDetails, ...movieDB };
      }
      setDetails({ loading: false, movie: movieDetails || {} });
    })
    fetchMovieDetails();
  }, [movieId]);

  const classes = useStyles();
  const { movie } = details;

  return (
    <div className={classes.container} >
      {!details.loading ? (
        <div className={classes.body}>
          <div className={classes.title}>
            <Typography className={classes.titleText} variant="h2">{movie.title}&nbsp;<span className={classes.year}>({movie.releaseDate.getFullYear()})</span></Typography>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <div>
                <div style={{ width: '90px' }}>
                  <StarIcon style={{ color: 'gold' }} />
                  <Typography display="inline" variant="h5">{movie.rating} </Typography>
                  <span>/&nbsp;10</span>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className={classes.movieImages}>
            <img className={classes.poster} alt={`${movie.title} poster`} src={movie.posterURI} />
            <img className={classes.backdropImage} alt={`${movie.tagline}`} src={movie.backdropImage} />
          </div>
          <Divider />
          <div className={classes.spaceBetween} >
            <Typography style={{ padding: '5px' }} variant="caption">{movie.tagline}</Typography>
            <div style={{ display: 'flex', justifyContent: 'space=between', padding: '5px' }}>
              <Typography style={{ marginRight: '8px', textAlign: 'right' }} display="inline" variant="caption">{movie.genres.join(' | ')}</Typography>
              <IMDBLink link={movie.imdbLink} title={movie.title} />
            </div>
          </div>
          <br />
          <Typography variant="body1">{movie.description}</Typography>
          <br />
          <Divider />
          <div className={classes.spaceBetween} style={{ padding: '10px 5px' }}>
            <RunTime runtime={movie.runtime} />
          </div>
        </div>
      ) : <Typography variant="subtitle1">Loading...</Typography>
      }
    </div >)
}

export default Details;