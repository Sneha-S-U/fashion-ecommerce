import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user:', err);
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

  if (!user) {
    return <div style={styles.container}>User not found</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Profile</h2>
        <div style={styles.field}><span style={styles.label}>Name:</span> {user.name}</div>
        <div style={styles.field}><span style={styles.label}>Username:</span> {user.username}</div>
        <div style={styles.field}><span style={styles.label}>Email:</span> {user.email}</div>
        <div style={styles.field}><span style={styles.label}>Phone:</span> {user.phone}</div>
        <div style={styles.field}><span style={styles.label}>Website:</span> {user.website}</div>
        <div style={styles.field}><span style={styles.label}>Company:</span> {user.company?.name}</div>
        <div style={styles.field}><span style={styles.label}>City:</span> {user.address?.city}</div>

        <Link to="/users" style={styles.backLink}>← Back to User List</Link>
      </div>
    </div>
  );
}

export default UserProfile;
