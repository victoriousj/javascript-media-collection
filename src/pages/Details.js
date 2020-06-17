import React, { useState, useEffect } from 'react'
import { Typography, makeStyles } from '@material-ui/core';

import IMDBLink from '../components/IMDBLink';
import MovieImages from '../components/MovieImages';
import MovieRatings from '../components/MovieRatings';
import DetailListing from '../components/DetailListing';

import { getData, getMovieData } from '../helpers';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
    width: '100%',
    height: 'auto'
  },
  body: {
    margin: '20px 0',
    width: '40%',
    height: 'auto',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '40px 60px',
    borderRadius: '5px',
  },
  title: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  rating: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: '2px 5px',
    borderRadius: 3,
    color: '#555',
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 10
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
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function Details({ id }) {
  const [details, setDetails] = useState({
    loading: true,
    error: null,
    movie: {},
  });

  useEffect(() => {
    const fetchMovieDetails = (async () => {
      let movieDetails = await getData('get', `movie/${id}`);

      if (movieDetails !== null) {
        const movieDB = await getMovieData(movieDetails.title, movieDetails.year);

        movieDetails = { ...movieDetails, ...movieDB };
      }
      setDetails({ loading: false, movie: movieDetails || {} });
    })
    fetchMovieDetails();
  }, [id]);

  const classes = useStyles();
  const { movie } = details;

  return (
    <div className={classes.container}>
      {!details.loading ? (
        <div className={classes.body}>
          <div className={classes.title}>
            <Typography className={classes.titleText} variant="h1">{movie.title}
              &nbsp;<span className={classes.rating}>{movie.rated}</span>
            </Typography>
            <MovieRatings ratings={movie.ratings} />
          </div>
          <hr />
          <MovieImages otherImages={movie.otherImages} title={movie.title} posterURI={movie.posterURI} backdropImage={movie.backdropImage} tagline={movie.tagline} />
          <hr />
          <div className={classes.spaceBetween} >
            <Typography style={{ padding: '5px' }} variant="caption">{movie.tagline}</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
              <Typography style={{ marginRight: '8px', textAlign: 'right' }} display="inline" variant="caption">{movie.genres.join(' | ')}</Typography>
            </div>
          </div>
          <br />
          <Typography variant="body1">{movie.description}</Typography>
          <div className={classes.spaceBetween} style={{ justifyContent: 'flex-end' }}>
            <IMDBLink link={movie.imdbLink} title={movie.title} />
          </div>
          <hr />
          <DetailListing details={[['Starring', movie.actors], ['Directed By', movie.director], ['Written By', movie.writer]]} />
          <DetailListing details={[['Runtime', `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`], ['Released', movie.released], ['Country', movie.country], ['Language', movie.language]]} />
        </div>
      ) : <Typography variant="subtitle1">Loading...</Typography>
      }
    </div >)
}

export default Details;