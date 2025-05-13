import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState(["tops", "bottom", "kurti", "sarees", "ethnic set", "dresses"]);
  const [sizes, setSizes] = useState(["Small", "Medium", "Large", "XL", "XXL"]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showSizeInput, setShowSizeInput] = useState(false);
  const [newSize, setNewSize] = useState('');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image: null,
    category: '',
    size: '',
    quantity: '',
    isActive: true,
  });

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm(prev => ({ ...prev, image: URL.createObjectURL(files[0]) }));
    } else if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: form.id,
      title: form.name,
      description: form.description,
      price: form.price,
      image: form.image,
      category: form.category,
      size: form.size,
      quantity: form.quantity,
      isActive: form.isActive,
    };

    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then(data => {
        setProducts(prev => [...prev, data]);
        setForm({
          id: '',
          name: '',
          description: '',
          price: '',
          image: null,
          category: '',
          size: '',
          quantity: '',
          isActive: true,
        });
        setShowForm(false);
      })
      .catch(err => console.error('Error adding product:', err));
  };

  const styles = {
    container: { padding: '30px', fontFamily: 'Segoe UI, sans-serif' },
    card: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    title: { marginBottom: '20px', fontSize: '24px', color: '#1e293b' },
    input: {
      width: '100%',
      padding: '10px',
      margin: '8px 0',
      borderRadius: '6px',
      border: '1px solid #ccc',
    },
    checkbox: {
      margin: '10px 0',
    },
    button: {
      padding: '8px 14px',
      backgroundColor: '#0ea5e9',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      margin: '4px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    thtd: {
      border: '1px solid #ccc',
      padding: '10px',
      textAlign: 'left',
    },
    imagePreview: {
      height: '60px',
      objectFit: 'cover',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product Management</h2>

      {/* Action Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button style={styles.button} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel Add Product' : 'Add Product'}
        </button>
        <button style={{ ...styles.button, backgroundColor: '#10b981' }} onClick={() => setShowCategoryInput(!showCategoryInput)}>
          {showCategoryInput ? 'Cancel Add Category' : 'Add Category'}
        </button>
        <button style={{ ...styles.button, backgroundColor: '#10b981' }} onClick={() => setShowSizeInput(!showSizeInput)}>
          {showSizeInput ? 'Cancel Add Size' : 'Add Size'}
        </button>
      </div>

      {/* Add Category Input */}
      {showCategoryInput && (
        <div style={styles.card}>
          <input
            style={styles.input}
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            style={{ ...styles.button, backgroundColor: '#14b8a6' }}
            onClick={() => {
              if (newCategory && !categories.includes(newCategory)) {
                setCategories([...categories, newCategory]);
                setNewCategory('');
                setShowCategoryInput(false);
              }
            }}
          >
            Add Category
          </button>
        </div>
      )}

      {/* Add Size Input */}
      {showSizeInput && (
        <div style={styles.card}>
          <input
            style={styles.input}
            type="text"
            placeholder="New Size"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
          />
          <button
            style={{ ...styles.button, backgroundColor: '#14b8a6' }}
            onClick={() => {
              if (newSize && !sizes.includes(newSize)) {
                setSizes([...sizes, newSize]);
                setNewSize('');
                setShowSizeInput(false);
              }
            }}
          >
            Add Size
          </button>
        </div>
      )}

      {/* Product Form */}
      {showForm && (
        <div style={styles.card}>
          <input style={styles.input} type="text" name="id" placeholder="Product ID" value={form.id} onChange={handleChange} />
          <input style={styles.input} type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
          <textarea style={styles.input} name="description" placeholder="Product Description" value={form.description} onChange={handleChange} />
          <input style={styles.input} type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
          <input style={styles.input} type="file" name="image" accept="image/*" onChange={handleChange} />
          {form.image && <img src={form.image} alt="Preview" style={styles.imagePreview} />}
          <select style={styles.input} name="category" value={form.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select style={styles.input} name="size" value={form.size} onChange={handleChange}>
            <option value="">Select Size</option>
            {sizes.map(size => <option key={size} value={size}>{size}</option>)}
          </select>
          <input style={styles.input} type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
          <label style={styles.checkbox}>
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Is Active
          </label>
          <button style={styles.button} onClick={handleAddProduct}>Add</button>
        </div>
      )}

      {/* Product Table */}
      {products.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thtd}>ID</th>
              <th style={styles.thtd}>Name</th>
              <th style={styles.thtd}>Category</th>
              <th style={styles.thtd}>Size</th>
              <th style={styles.thtd}>Quantity</th>
              <th style={styles.thtd}>Price</th>
              <th style={styles.thtd}>Active</th>
              <th style={styles.thtd}>Image</th>
              <th style={styles.thtd}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td style={styles.thtd}>{product.id}</td>
                <td style={styles.thtd}>{product.title}</td>
                <td style={styles.thtd}>{product.category}</td>
                <td style={styles.thtd}>{product.size || 'N/A'}</td>
                <td style={styles.thtd}>{product.quantity || 'N/A'}</td>
                <td style={styles.thtd}>${product.price}</td>
                <td style={styles.thtd}>{product.isActive ? 'Yes' : 'No'}</td>
                <td style={styles.thtd}>
                  {product.image ? <img src={product.image} alt="Product" style={styles.imagePreview} /> : 'N/A'}
                </td>
                <td style={styles.thtd}>
                  <button
                    style={styles.button}
                    onClick={() => navigate(`/products/view/${product.id}`)}
                  >
                    View
                  </button>
                  <button
                    style={{ ...styles.button, backgroundColor: '#6366f1' }}
                    onClick={() => navigate(`/products/edit/${product.id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;
