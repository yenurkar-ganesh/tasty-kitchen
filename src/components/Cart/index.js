import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'
import CartContext from '../../context/CartContext'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <div className="detailed-card-container">
          <Navbar />
          <div className="cart-section">
            <table className="cart-table">
              <thead>
                <tr className="cart-list-info">
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="t-boddy">
                {cartList.map(eachItem => (
                  <tr className="cart-list-info" key={eachItem.id}>
                    <td className="cart-img-info">
                      <img
                        className="cart-img"
                        src={eachItem.image_url}
                        alt={eachItem.name}
                      />
                      <p>{eachItem.name}</p>
                    </td>

                    <td className="cart-quant-section">
                      <button className="decreamentBtn">
                        <img
                          src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734544385/Tasty-Kitchen-App/Icons/Frame_14_n2ibuj.png"
                          alt="decreament"
                        />
                      </button>
                      {eachItem.quantity}
                      <button className="decreamentBtn">
                        <img
                          src="https://res.cloudinary.com/dq92tiimk/image/upload/v1734544384/Tasty-Kitchen-App/Icons/Frame_15_othnyg.png"
                          alt="increment"
                        />
                      </button>
                    </td>
                    <td>{eachItem.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Footer />
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
