import React from 'react'
import { Typography } from '@material-ui/core'

import rottenGood from '../assets/rotten-good.svg'
import rottenBad from '../assets/rotten-bad.svg'

function RottenTomatoScore({ score }) {
  const goodOrBad = parseFloat(score) > 59 ? true : false;

  return (
    score ? (
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 15 }}>
        <img src={goodOrBad ? rottenGood : rottenBad} style={{ height: 20 }} alt="Rotten Tomato Score" />
        <Typography style={{ marginTop: 5 }} display="inline" variant="subtitle1">&nbsp;{`${score}`}</Typography>
      </div>
    ) : <span />
  )

}

export default RottenTomatoScore;