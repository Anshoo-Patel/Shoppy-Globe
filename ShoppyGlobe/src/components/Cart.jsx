import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import '../styles.css';

function Cart() {
  const items = useSelector(state => state.cart.items);

  return (
    <div className='cart-items'>
      {items.length ? (
        items.map(item => <CartItem key={item.id} item={item} />)
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  );
}

export default Cart;
