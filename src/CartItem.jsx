import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export default function CartItem({ setPage }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const itemTotal = (i) => i.cost * i.quantity;
  const cartTotal = items.reduce((sum, i) => sum + itemTotal(i), 0);

  const increase = (i) =>
    dispatch(updateQuantity({ name: i.name, quantity: i.quantity + 1 }));

  const decrease = (i) => {
    if (i.quantity > 1)
      dispatch(updateQuantity({ name: i.name, quantity: i.quantity - 1 }));
    else dispatch(removeItem(i.name));
  };

  return (
    <div>
      <nav className="navbar">
        <strong>Paradise Nursery</strong>
        <div>
          <a onClick={() => setPage('home')}>Home</a>
          <a onClick={() => setPage('plants')}>Plants</a>
          <a onClick={() => setPage('cart')} className="cart-icon">
            🛒 Cart (<span>{totalCount}</span>)
          </a>
        </div>
      </nav>

      <div className="cart">
        <h2>Shopping Cart</h2>
        {items.length === 0 && <p>Your cart is empty.</p>}

        {items.map((i) => (
          <div className="cart-item" key={i.name}>
            <img src={i.image} alt={i.name} />
            <div>
              <h3>{i.name}</h3>
              <p>Unit price: ${i.cost}</p>
            </div>
            <div className="qty">
              <button onClick={() => decrease(i)}>-</button>
              <span style={{ margin: '0 10px' }}>{i.quantity}</span>
              <button onClick={() => increase(i)}>+</button>
            </div>
            <p>Total: ${itemTotal(i)}</p>
            <button onClick={() => dispatch(removeItem(i.name))}>Delete</button>
          </div>
        ))}

        <h3>Total Cart Amount: ${cartTotal}</h3>

        <div className="cart-actions">
          <button onClick={() => setPage('plants')}>Continue Shopping</button>
          <button onClick={() => alert('Coming Soon')}>Checkout</button>
        </div>
      </div>
    </div>
  );
}