import { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://inventory-backend-production-2954.up.railway.app/api');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemAdded = (newItem) => {
    setItems([newItem, ...items]);
  };

  const handleItemDeleted = (id) => {
    setItems(items.filter(item => item._id !== id));
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Smart <span className="gradient-text">Inventory</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Real-time stock management with premium aesthetics.
        </p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        <InventoryForm onItemAdded={handleItemAdded} />
        {loading ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading inventory...</p>
          </div>
        ) : (
          <InventoryList items={items} onItemDeleted={handleItemDeleted} />
        )}
      </main>

      <footer style={{ textAlign: 'center', marginTop: '6rem', padding: '2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
        <p>© 2026 Smart Inventory Management System. Built with MERN Stack.</p>
      </footer>
    </div>
  );
}

export default App;
