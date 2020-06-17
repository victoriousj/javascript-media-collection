import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

function ImageCarousel({ images }) {
  return (
    <Carousel style={{ height: 262, overflow: 'hidden' }} >
      {
        images.map(image => {
          return (
            <Carousel.Item>
              <img
                style={{ width: '100%', margin: 'auto', padding: 0 }}
                className=""
                src={image}
                alt={image}
              />
            </Carousel.Item>

          )
        })
      }
    </Carousel>
  )
}

export default ImageCarousel;