import React from 'react'

function RunTime({ runtime }) {
  return (
    <span>{Math.floor(runtime / 60)}h {runtime % 60}min</span>
  )
}

export default RunTime;