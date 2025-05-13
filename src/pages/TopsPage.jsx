import { useState } from 'react';

const sampleProducts = [
  {
    id: 1,
    name: 'Floral Printed Top',
    price: 999,
    discount: 20,
    rating: 4.2,
    image: 'https://i.postimg.cc/59YbH3xL/top1.jpg',
  },
  {
    id: 2,
    name: 'Chiffon Ruffle Top',
    price: 1199,
    discount: 30,
    rating: 4.5,
    image: 'https://i.postimg.cc/NjYczvRk/top2.jpg',
  },
  {
    id: 3,
    name: 'Casual Cotton Top',
    price: 799,
    discount: 10,
    rating: 4.0,
    image: 'https://i.postimg.cc/C1WyC3FD/top3.webp',
  },
];

const styles = {
  page: {
    padding: '1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  layout: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
  },
  aside: {
    minWidth: '220px',
    maxWidth: '250px',
    borderRight: '1px solid #eee',
    paddingRight: '1rem',
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  searchInput: {
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '0.4rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  main: {
    flex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    justifyContent: 'center',
  },
  card: {
    background: '#fff',
    border: '1px solid #eee',
    padding: '0.8rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '0.8rem',
  },
  discount: {
    color: '#e91e63',
    fontWeight: 500,
  },
  footer: {
    marginTop: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#e91e63',
    color: 'white',
    padding: '0.4rem 0.8rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default function TopsPage({ cartItems, setCartItems, wishlistItems, setWishlistItems }) {
  const [sortOrder, setSortOrder] = useState('asc');
  const [minDiscount, setMinDiscount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const filteredProducts = sampleProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
      const meetsDiscount = product.discount >= minDiscount;
      return matchesSearch && meetsDiscount;
    })
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  const addToCart = (product) => {
    if (!cartItems.some((item) => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
  };

  const addToWishlist = (product) => {
    if (!wishlistItems.some((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Tops</h2>
      <div style={styles.layout}>
        {/* Filters */}
        <aside style={styles.aside}>
          <div style={styles.filters}>
            <input
              type="text"
              placeholder="Search tops..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={styles.searchInput}
            />
            <div style={styles.inputGroup}>
              <label htmlFor="sort">Sort:</label>
              <select
                id="sort"
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
                style={styles.select}
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="discount">Min Discount:</label>
              <select
                id="discount"
                onChange={(e) => setMinDiscount(parseInt(e.target.value))}
                value={minDiscount}
                style={styles.select}
              >
                <option value={0}>All</option>
                <option value={10}>10%+</option>
                <option value={20}>20%+</option>
                <option value={30}>30%+</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Cards */}
        <main style={styles.main}>
          <div style={styles.grid}>
            {filteredProducts.map((product) => {
              const discountedPrice = product.price - (product.price * product.discount) / 100;
              return (
                <div style={styles.card} key={product.id}>
                  <img src={product.image} alt={product.name} style={styles.image} />
                  <h4>{product.name}</h4>
                  <p>
                    ₹{discountedPrice.toFixed(0)}{' '}
                    <span style={styles.discount}>({product.discount}% OFF)</span>
                  </p>
                  <div style={styles.footer}>
                    <button style={styles.button} onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                    <button
                      style={{ ...styles.button, backgroundColor: '#555' }}
                      onClick={() => addToWishlist(product)}
                    >
                      Wishlist
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
