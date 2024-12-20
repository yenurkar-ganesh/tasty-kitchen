import {Component} from 'react'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

class RestaurentDetailsCard extends Component {
  state = {
    restaurentDetails: {},
  }

  componentDidMount() {
    this.getRestuarentDetails()
  }

  getRestuarentDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    if (jwtToken) {
      try {
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        this.setState({restaurentDetails: data})
      } catch (error) {
        console.error('Error while fetching the details', error)
      }
    }
  }

  render() {
    const {restaurentDetails} = this.state
    const foodItems = restaurentDetails.food_items || []

    return (
      <div className="detailed-card-container">
        <Navbar />
        <div className="banner-section">
          <div className="restaurent-card">
            <img
              className="card-image"
              src={restaurentDetails.image_url}
              alt={restaurentDetails.name}
            />
            <div className="restaurent-details-section">
              <h1 className="section-heading">{restaurentDetails.name} </h1>
              <p className="card-cuisine">{restaurentDetails.cuisine} </p>
              <p className="card-location">{restaurentDetails.location} </p>
              <div className="meta-info-section">
                <div className="rating-section">
                  <p>⭐ {restaurentDetails.rating} </p>
                  <p>{restaurentDetails.reviews_count}+ Ratings </p>
                </div>
                <span className="vertical-bar" />
                <div className="cost-meta-info">
                  <p>₹ {restaurentDetails.cost_for_two} </p>
                  <p>Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="fooditem-container">
          {foodItems.map(item => (
            <FoodItem key={item.id} foodItem={item} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }
}

export default RestaurentDetailsCard
