import React from 'react'
import { Typography } from '@material-ui/core'

import metacritic from '../assets/metacritic.svg'

function RottenTomatoScore({ score }) {
  return (
    score ? (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={metacritic} style={{ height: 20 }} alt={"Meta Critic Score"} />
        <Typography style={{ marginTop: 5 }} display="inline" variant="subtitle1">&nbsp;{`${score}`}</Typography>
      </div>
    ) : <span />
  )

}

export default RottenTomatoScore;