import React from 'react'
import CartDetails from './CartDetails'
import { Metadata } from 'next'

export const metaData: Metadata = {
  title: 'Shopping Cart',
}

const CartPage = () => {
  return <CartDetails />
}

export default CartPage
