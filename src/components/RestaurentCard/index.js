import './index.css'
import {Link} from 'react-router-dom'

const RestaurentCard = props => {
  const {eachRestro} = props
  return (
    <Link className="restro-link" to={`/restaurants-list/${eachRestro.id}`}>
      <li className="restro-card">
        <img
          src={eachRestro.imageUrl}
          alt={eachRestro.name}
          className="restro-card-img"
        />
        <div className="restro-card-info">
          <h1 className="restro-card-heading">{eachRestro.name} </h1>
          <p className="restro-card-cuisine-title">{eachRestro.cuisine} </p>
          <p>
            ⭐ <span className="rating">{eachRestro.userRating.rating}</span> (
            {eachRestro.userRating.total_reviews})
          </p>
        </div>
      </li>
    </Link>
  )
}

export default RestaurentCard
