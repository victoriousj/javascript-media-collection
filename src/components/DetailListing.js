import React from 'react';
import { Typography, Divider } from '@material-ui/core'

function DetailListing({ details }) {
  return (
    <div>
      <div style={{ padding: '10px 0' }}>
        {
          details.map((entry, index) => {
            return (
              <div key={entry[0]}>
                <Typography variant="subtitle1">{`${entry[0]}: ${entry[1]}`}</Typography>
                {index !== details.length - 1 && <Divider />}
              </div>
            )
          })
        }
      </div>
      <hr />
    </div>
  )
}

export default DetailListing;