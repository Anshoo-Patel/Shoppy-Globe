import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions';
import '../styles.css';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div>
    <div style={{width: '400px', margin: '20px'}}>
      <img src={item.images} height='200px' width='200px' />
      <h3>{item.title}</h3>
      <p>Price: ${item.price}</p>
      <button onClick={handleRemove}>Remove from Cart</button>
    </div>
    </div>
  );
}

export default CartItem;
