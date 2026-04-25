import { useState } from 'react';
import axios from 'axios';

const InventoryForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/items', formData);
      onItemAdded(response.data);
      setFormData({ name: '', price: '', description: '' });
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card animate-fade-in">
      <h2 style={{ marginBottom: '1.5rem' }}>Add New <span className="gradient-text">Inventory Item</span></h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.2rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Item Name</label>
          <input
            type="text"
            placeholder="e.g. MacBook Pro M3"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Price ($)</label>
          <input
            type="number"
            placeholder="0.00"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            step="0.01"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Description (Optional)</label>
          <textarea
            rows="3"
            placeholder="Enter item details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add to Inventory'}
        </button>
      </form>
    </div>
  );
};

export default InventoryForm;
