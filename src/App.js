import {useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Cart from './components/Cart'
import CartContext from './context/CartContext'
import RestaurentDetailsCard from './components/RestaurentDetailsCard'

const App = () => {
  // Initialize cartList from localStorage
  const [cartList, setCartList] = useState(() => {
    const storedCart = localStorage.getItem('cartList')
    return storedCart ? JSON.parse(storedCart) : []
  })

  // Add item to cart
  const addItemHandler = foodItem => {
    setCartList(prevList => {
      const isItemExist = prevList.find(item => item.id === foodItem.id)

      if (isItemExist) {
        // Update quantity if item exists
        return prevList.map(eachItem =>
          eachItem.id === foodItem.id
            ? {
                ...eachItem,
                quantity: (eachItem.quantity || 0) + 1,
              }
            : eachItem,
        )
      }

      // Add new item with quantity 1 if not in cart
      return [...prevList, {...foodItem, quantity: foodItem.quantity || 1}]
    })
  }

  // Remove item from cart
  const removeItemHandler = foodItemId => {
    setCartList(prevList => prevList.filter(item => item.id !== foodItemId))
  }

  // Increase quantity
  const increaseQuantityHandler = foodItemId => {
    setCartList(prevList =>
      prevList.map(eachItem =>
        eachItem.id === foodItemId
          ? {...eachItem, quantity: eachItem.quantity + 1}
          : eachItem,
      ),
    )
  }

  // Decrease quantity
  const decreaseQuantityHandler = foodItemId => {
    setCartList(
      prevList =>
        prevList
          .map(eachItem =>
            eachItem.id === foodItemId && eachItem.quantity > 1
              ? {...eachItem, quantity: eachItem.quantity - 1}
              : eachItem,
          )
          .filter(item => item.quantity > 0), // Remove items with quantity 0
    )
  }

  // Sync cartList with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])

  return (
    <CartContext.Provider
      value={{
        cartList,
        addItemToCart: addItemHandler,
        removeItemFromCart: removeItemHandler,
        increaseQuantity: increaseQuantityHandler,
        decreaseQuantity: decreaseQuantityHandler,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurants-list/:id"
            component={RestaurentDetailsCard}
          />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
