import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core';

import ImageCarousel from './ImageCarousel'

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
    border: '1px solid rgba(255,255,255,0.1)',
    overflow: 'hidden'
  },
  carousel: {
    overflow: 'hidden'
  }
}));


function MovieImages({ title, posterURI, tagline, otherImages }) {

  useEffect(() => { }, [title, posterURI, tagline, otherImages]);

  const classes = useStyles();

  return (

    <div className={classes.movieImages}>
      <div>
        <img className={classes.poster} alt={`${title} poster`} src={posterURI} />
      </div>
      <ImageCarousel images={otherImages} />
    </div>
  )
}

export default MovieImages;