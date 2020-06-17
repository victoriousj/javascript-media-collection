import React from 'react';

import RottenTomatoScore from './RottenTomatoScore';
import MetacriticScore from './MetacriticScore';

function MovieRatings({ ratings }) {
  return (
    <div style={{ display: 'flex' }}>
      <RottenTomatoScore score={ratings?.find(x => x.Source === 'Rotten Tomatoes')?.Value} />
      <MetacriticScore score={ratings?.find(x => x.Source === 'Metacritic')?.Value} />
    </div>
  )
}

export default MovieRatings;