import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ManagerProfile() {
  const { id } = useParams();
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setManager(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching manager:', err);
        setLoading(false);
      });
  }, [id]);

  const styles = {
    container: {
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      maxWidth: '500px',
      margin: '0 auto',
    },
    title: {
      marginBottom: '15px',
      fontSize: '24px',
      color: '#1e293b',
    },
    field: {
      marginBottom: '10px',
      color: '#475569',
    },
    label: {
      fontWeight: 'bold',
      color: '#334155',
    },
    backLink: {
      display: 'inline-block',
      marginTop: '20px',
      textDecoration: 'none',
      color: '#0ea5e9',
    },
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (!manager) {
    return <div style={styles.container}>Manager not found</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Manager Profile</h2>
        <div style={styles.field}><span style={styles.label}>Name:</span> {manager.name}</div>
        <div style={styles.field}><span style={styles.label}>Username:</span> {manager.username}</div>
        <div style={styles.field}><span style={styles.label}>Email:</span> {manager.email}</div>
        <div style={styles.field}><span style={styles.label}>Phone:</span> {manager.phone}</div>
        <div style={styles.field}><span style={styles.label}>Website:</span> {manager.website}</div>
        <div style={styles.field}><span style={styles.label}>Company:</span> {manager.company?.name}</div>
        <div style={styles.field}><span style={styles.label}>City:</span> {manager.address?.city}</div>

        <Link to="/managers" style={styles.backLink}>← Back to Manager List</Link>
      </div>
    </div>
  );
}

export default ManagerProfile;
