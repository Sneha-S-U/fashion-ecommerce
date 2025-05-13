import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') // demo API
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#1e293b',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    th: {
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '12px',
      textAlign: 'left',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #e2e8f0',
      color: '#334155',
    },
    btn: {
      padding: '6px 12px',
      borderRadius: '4px',
      marginRight: '8px',
      cursor: 'pointer',
      border: 'none',
    },
    viewBtn: {
      backgroundColor: '#0ea5e9',
      color: 'white',
    },
    deleteBtn: {
      backgroundColor: '#ef4444',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Management</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <Link to={`/user/${user.id}`}>
                  <button style={{ ...styles.btn, ...styles.viewBtn }}>View</button>
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ ...styles.btn, ...styles.deleteBtn }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
