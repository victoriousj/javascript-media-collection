import React from 'react';

import imdb from '../imdb.png';

function IMDBLink({ link, title }) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={link} title={`${title}'s IMDB Entry`} >
      <img style={{ width: '45px' }} alt="" src={imdb} />
    </a >
  )
}

export default IMDBLink;