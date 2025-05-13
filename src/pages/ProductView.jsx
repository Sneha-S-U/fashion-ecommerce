import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const styles = {
    container: {
      padding: '30px',
      maxWidth: '700px',
      margin: '0 auto',
      backgroundColor: '#f1f5f9',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
      fontSize: '26px',
      marginBottom: '15px',
      color: '#1e293b',
    },
    image: {
      width: '200px',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '15px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    description: {
      fontSize: '16px',
      marginBottom: '10px',
      color: '#334155',
    },
    info: {
      fontSize: '16px',
      marginBottom: '6px',
      color: '#475569',
    },
  };

  if (!product) return <p style={{ padding: '20px' }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} style={styles.image} />
      <p style={styles.description}>{product.description}</p>
      <p style={styles.info}><strong>Category:</strong> {product.category}</p>
      <p style={styles.info}><strong>Price:</strong> ${product.price}</p>
    </div>
  );
}

export default ProductView;
