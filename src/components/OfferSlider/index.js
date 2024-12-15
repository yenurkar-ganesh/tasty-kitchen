import React from 'react'
import Slider from 'react-slick'
import './index.css'

const OfferSlider = props => {
  const {offerList} = props

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Add autoplay to see if the slider moves automatically
    autoplaySpeed: 2000, // Speed of autoplay
  }

  return (
    <Slider {...settings}>
      {offerList.map(eachOffer => (
        <div className="offer-list" key={eachOffer.id}>
          <img
            src={eachOffer.image_url}
            alt={`Offer ${eachOffer.id}`}
            className="offer-image"
          />
        </div>
      ))}
    </Slider>
  )
}

export default OfferSlider
