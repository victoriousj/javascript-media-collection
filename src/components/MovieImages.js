import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
  }
}));


function MovieImages({ title, posterURI, tagline, backdropImage }) {
  const classes = useStyles();

  return (

    <div className={classes.movieImages}>
      <img className={classes.poster} alt={`${title} poster`} src={posterURI} />
      <img className={classes.backdropImage} alt={`${tagline}`} src={backdropImage} />
    </div>
  )
}

export default MovieImages;