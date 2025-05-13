import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Managers() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    // Simulate fetching manager data from API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setManagers(data.slice(5, 10))); // Slice for demo: 5 managers
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this manager?")) {
      setManagers(prev => prev.filter(manager => manager.id !== id));
    }
  };

  const styles = {
    container: {
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
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
      borderBottom: '1px solid #e5e7eb',
    },
    actionBtn: {
      marginRight: '10px',
      padding: '6px 12px',
      fontSize: '14px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    },
    viewBtn: {
      backgroundColor: '#0ea5e9',
      color: 'white',
      textDecoration: 'none',
    },
    deleteBtn: {
      backgroundColor: '#ef4444',
      color: 'white',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#1e293b',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manager List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.id}>
              <td style={styles.td}>{manager.id}</td>
              <td style={styles.td}>{manager.name}</td>
              <td style={styles.td}>{manager.email}</td>
              <td style={styles.td}>
                <Link
                  to={`/manager/${manager.id}`}
                  style={{ ...styles.actionBtn, ...styles.viewBtn }}
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(manager.id)}
                  style={{ ...styles.actionBtn, ...styles.deleteBtn }}
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

export default Managers;
