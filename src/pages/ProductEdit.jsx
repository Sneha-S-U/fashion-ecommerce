import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleSave = () => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then(res => res.json())
      .then(() => navigate('/products'));
  };

  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  const styles = {
    container: {
      padding: '30px',
      maxWidth: '700px',
      margin: '0 auto',
      backgroundColor: '#f9fafb',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#1e293b',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    select: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      minHeight: '80px',
      marginBottom: '15px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '10px 16px',
      backgroundColor: '#0ea5e9',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '5px',
      display: 'block',
      color: '#475569',
    },
  };

  if (!product) return <p style={{ padding: '20px' }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Product: {product.title}</h2>

      <label style={styles.label}>Name</label>
      <input
        style={styles.input}
        type="text"
        value={product.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />

      <label style={styles.label}>Description</label>
      <textarea
        style={styles.textarea}
        value={product.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />

      <label style={styles.label}>Price</label>
      <input
        style={styles.input}
        type="number"
        value={product.price}
        onChange={(e) => handleChange('price', e.target.value)}
      />

      <label style={styles.label}>Quantity</label>
      <input
        style={styles.input}
        type="number"
        value={product.stock || ''}
        onChange={(e) => handleChange('stock', e.target.value)}
      />

      <label style={styles.label}>Size</label>
      <select
        style={styles.select}
        value={product.size || ''}
        onChange={(e) => handleChange('size', e.target.value)}
      >
        <option value="">Select Size</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>

      <label style={styles.label}>Active</label>
      <select
        style={styles.select}
        value={product.active ? 'true' : 'false'}
        onChange={(e) => handleChange('active', e.target.value === 'true')}
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>

      <label style={styles.label}>Image URL</label>
      <input
        style={styles.input}
        type="text"
        value={product.thumbnail || ''}
        onChange={(e) => handleChange('thumbnail', e.target.value)}
      />
      {product.thumbnail && (
        <img
          src={product.thumbnail}
          alt="Product Preview"
          style={{ width: '100px', height: 'auto', marginBottom: '15px', borderRadius: '6px' }}
        />
      )}

      <button style={styles.button} onClick={handleSave}>Save</button>
    </div>
  );
}

export default ProductEdit;
