import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <h2>{sidebarOpen ? 'Admin Panel' : 'A'}</h2>
        <nav>
          <ul>
            <li title="Dashboard">Dashboard</li>
            <Link to="/products"><li title="Products">Products</li></Link>
            <li title="Orders">Orders</li>
            <li title="Logout">Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="main">
        <header className="header">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="toggle-btn"
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
          <h1>Dashboard</h1>
        </header>

        <section className="content">
          <div className="dashboard-grid">
            <Link to="/users" className="card link-card">
              <h3>Total Users</h3>
              <p>View Details</p>
            </Link>
            <Link to="/managers" className="card link-card">
              <h3>Total Managers</h3>
              <p>View Details</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Admin;
