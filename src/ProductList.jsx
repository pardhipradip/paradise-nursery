import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const categories = [
  {
    category: 'Air Purifying',
    plants: [
      { name: 'Snake Plant', image: 'https://...', cost: 15 },
      { name: 'Spider Plant', image: 'https://...', cost: 12 },
      // add 4 more
    ],
  },
  {
    category: 'Aromatic',
    plants: [
      { name: 'Lavender', image: 'https://...', cost: 20 },
      { name: 'Jasmine', image: 'https://...', cost: 18 },
      // add 4 more
    ],
  },
  {
    category: 'Low Maintenance',
    plants: [
      { name: 'Aloe Vera', image: 'https://...', cost: 14 },
      { name: 'ZZ Plant', image: 'https://...', cost: 25 },
      // add 4 more
    ],
  },
];

export default function ProductList({ setPage }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const isInCart = (name) => items.some((i) => i.name === name);

  return (
    <div>
      <nav className="navbar">
        <strong>Paradise Nursery</strong>
        <div>
          <a onClick={() => setPage('home')}>Home</a>
          <a onClick={() => setPage('plants')}>Plants</a>
          <a onClick={() => setPage('cart')} className="cart-icon">
            🛒 <span>{totalCount}</span>
          </a>
        </div>
      </nav>

      {categories.map((group) => (
        <div className="category" key={group.category}>
          <h2>{group.category}</h2>
          <div className="plant-grid">
            {group.plants.map((plant) => (
              <div className="plant-card" key={plant.name}>
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>${plant.cost}</p>
                <button
                  disabled={isInCart(plant.name)}
                  onClick={() => dispatch(addItem(plant))}
                >
                  {isInCart(plant.name) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}