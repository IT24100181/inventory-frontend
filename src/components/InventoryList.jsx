import axios from 'axios';

const InventoryList = ({ items, onItemDeleted }) => {
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      onItemDeleted(id);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Current <span className="gradient-text">Inventory</span></h2>
      {items.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No items found in stock.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {items.map((item) => (
            <div 
              key={item._id} 
              style={{ 
                background: 'rgba(255,255,255,0.03)', 
                padding: '1.2rem', 
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid var(--border)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>{item.name}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: '600', marginTop: '0.2rem' }}>
                  ${parseFloat(item.price).toLocaleString()}
                </p>
                {item.description && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    {item.description}
                  </p>
                )}
              </div>
              <button 
                onClick={() => handleDelete(item._id)} 
                className="btn-danger"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryList;
