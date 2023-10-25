import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { desktopbanner, mobileBammer } from '../../data/data';




const Banner = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener('change', e => setMatches(e.matches));
  }, []);
  return (
    <Carousel responsive={responsive}
      swipeable={false}
      draggable={false}
      infinite={true}
      showDots={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px">
      {matches && desktopbanner.map((item) => {
        return (
          <div key={item.id} className='banner-img'>
            <img src={item.url} alt='banner' />
          </div>
        )
      })}

      {!matches && mobileBammer.map((item) => {
        return (
          <div key={item.id} className='mobile-banner-img'>
            <img src={item.url} alt='banner' />
          </div>
        )
      })}
    </Carousel>
  )
}

export default Banner
