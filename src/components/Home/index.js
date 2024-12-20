import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPaginate from 'react-paginate'
import './index.css'
import Navbar from '../Navbar'
import Footer from '../Footer'
import OfferSlider from '../OfferSlider'
import RestaurantCard from '../RestaurentCard'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const jwtToken = Cookies.get('jwt_token')
const ITEMS_PER_PAGE = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    offerList: [],
    initialRestaurentList: [],
    userSearchList: [],
    currentPage: 0,
  }

  componentDidMount() {
    this.getOfferList()
    this.getRestaurentList()
  }

  updatetheString = data =>
    data.restaurants.map(eachRest => ({
      id: eachRest.id,
      costForTwo: eachRest.cost_for_two,
      cuisine: eachRest.cuisine,
      groupByTime: eachRest.group_by_time,
      hasOnlineDelivery: eachRest.has_online_delivery,
      hasTableBooking: eachRest.has_table_booking,
      imageUrl: eachRest.image_url,
      isDeliveringNow: eachRest.is_delivering_now,
      location: eachRest.location,
      menuType: eachRest.menu_type,
      name: eachRest.name,
      opensAt: eachRest.opens_at,
      userRating: eachRest.user_rating,
    }))

  getRestaurentList = async () => {
    // const apiUrl = 'https://apis.ccbp.in/restaurants-list?offset=0&limit=30'
    const apiUrl =
      'https://apis.ccbp.in/restaurants-list?offset=0&limit=60&sort_by_rating=Highest'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    if (jwtToken) {
      try {
        const response = await fetch(apiUrl, options)
        if (response.ok) {
          const data = await response.json()
          const updatedData = this.updatetheString(data)
          this.setState({
            initialRestaurentList: updatedData,
            userSearchList: updatedData,
          })

          console.log(updatedData)
        }
      } catch (error) {
        console.error(`An error occurred while fetching restaurants`, error)
      }
    }
  }

  getOfferList = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    if (jwtToken) {
      try {
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          this.setState({offerList: data.offers})
        }
      } catch (error) {
        console.error(`An error occurred while fetching offers`)
      }
    }
  }

  handlePageClick = ({selected}) => {
    this.setState({currentPage: selected})
  }

  userInputHandler = async ev => {
    const userInput = ev.target.value.trim()
    const url = `https://apis.ccbp.in/restaurants-list?search=${userInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = this.updatetheString(data)
        this.setState({userSearchList: updatedData})
      }
    } catch (error) {
      console.error(`An error occurred while fetching offers`)
    }
  }

  render() {
    const {
      offerList,
      initialRestaurentList,
      userSearchList,
      currentPage,
    } = this.state
    const offset = currentPage * ITEMS_PER_PAGE
    const paginatedRestaurants = userSearchList.slice(
      offset,
      offset + ITEMS_PER_PAGE,
    )
    const pageCount = Math.ceil(userSearchList.length / ITEMS_PER_PAGE)

    return (
      <div className="container">
        <Navbar />
        <section className="home-container">
          <div className="sub-cotainer">
            <div className="offer-slider-section">
              <OfferSlider offerList={offerList} />
            </div>
            <div className="search-section">
              <input
                className="search-input"
                placeholder="Search your favourite restaurants..."
                type="search"
                onChange={this.userInputHandler}
              />
            </div>
            <div className="restaurent-section">
              <div className="header-section">
                <h1 className="meta-heading">Popular Restaurants</h1>
                <div className="meta-info">
                  <p className="meta-desc">
                    Select Your favourite restaurant special dish and make your
                    day happy...
                  </p>
                  <select className="sort-funtionality">
                    {sortByOptions.map(eachoption => (
                      <option className="sort-options" key={eachoption.id}>
                        {eachoption.displayText}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <hr className="line" />
              <ul className="restro-section">
                {paginatedRestaurants.map(eachRestro => (
                  <RestaurantCard key={eachRestro.id} eachRestro={eachRestro} />
                ))}
              </ul>
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
                previousLinkClassName="previous-link"
                nextLinkClassName="next-link"
                pageLinkClassName="page-link"
                breakLinkClassName="break-link"
              />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}
export default Home
