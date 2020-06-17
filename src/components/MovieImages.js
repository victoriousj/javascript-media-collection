import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'

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
  },
  carousel: {
    overflow: 'hidden'
  }
}));


function MovieImages({ title, posterURI, tagline, otherImages }) {

  useEffect(() => { }, []);

  const classes = useStyles();

  return (

    <div className={classes.movieImages}>
      <div>
        <img className={classes.poster} alt={`${title} poster`} src={posterURI} />
      </div>
      <Carousel
        // animation="slide"
        indicators={false}
        className={classes.carousel}
        navButtonsAlwaysVisible={true}
      >
        {
          otherImages.map((image) => {
            return <img
              key={image}
              src={image}
              alt={`${tagline} poster`}
              className={classes.poster}
            />
          })
        }
      </Carousel>
    </div>
  )
}

export default MovieImages;