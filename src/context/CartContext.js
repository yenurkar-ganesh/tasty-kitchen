import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
})

export default CartContext
