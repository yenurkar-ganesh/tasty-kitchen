import './index.css'
import CartContext from '../../context/CartContext'

const FoodItem = props => {
  const {foodItem} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, addItemToCart} = value

        const addHandler = () => {
          addItemToCart(foodItem)
        }

        return (
          <li className="food-item-card">
            <img className="food-item-img" src={foodItem.image_url} />
            <div className="item-metadata-info">
              <p className="metadata-heading">{foodItem.name}</p>
              <p className="metadata-price">₹ {foodItem.cost}</p>
              <p className="metadata-rating">⭐ {foodItem.rating}</p>
              <button onClick={addHandler} className="metadata-button">
                ADD
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default FoodItem
