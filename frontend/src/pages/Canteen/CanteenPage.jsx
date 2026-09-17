import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import '../../styles/canteen.css';

export default function CanteenPage() {
  const {
    menu,
    cart,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    removeFromCart,
    checkout,
  } = useApp();

  const [processing, setProcessing] = useState(false);

  const filteredMenu = menu.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.p, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty! Add some items first.');
      return;
    }
    setProcessing(true);
    checkout();
    setTimeout(() => {
      setProcessing(false);
    }, 1200);
  };

  return (
    <div className="view-section">
      <h1 className="section-header">Campus Connect Canteen</h1>

      <div className="canteen-grid">
        {/* Menu Section */}
        <div className="card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '24px', color: '#2d3748' }}>
              🍽️ Today's Menu
            </h3>
            <div>
              <select
                style={{ margin: 0, width: '160px' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Items</option>
                <option value="snacks">Snacks</option>
                <option value="meals">Meals</option>
                <option value="drinks">Drinks</option>
                <option value="desserts">Desserts</option>
                <option value="combos">Combos</option>
              </select>
            </div>
          </div>

          <div id="menu-container">
            {filteredMenu.map((item, idx) => (
              <div key={item.id ?? idx} className="menu-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: `var(--gradient-${(idx % 4) + 1})`,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                    }}
                  >
                    {item.icon || '🍽️'}
                  </div>
                  <div>
                    <div className="menu-item-name">{item.n}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div className="menu-item-price">₹{item.p}</div>
                  <button className="add-to-cart" onClick={() => addToCart(item)}>
                    Add +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="card" style={{ borderTop: '6px solid var(--success)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <div style={{ fontSize: '30px' }}>🛒</div>
            <h3 style={{ margin: 0, fontSize: '24px', color: '#2d3748' }}>
              Your Cart
            </h3>
          </div>

          <div className="cart-items-container">
            {cart.length > 0 ? (
              cart.map((item, idx) => (
                <div key={idx} className="cart-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: `var(--gradient-${(idx % 4) + 1})`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '18px',
                      }}
                    >
                      {item.icon || '🍽️'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.n}</div>
                      <div style={{ fontSize: '13px', color: '#94a3b8' }}>{item.category}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{item.p}</div>
                    <button
                      className="remove-cart-btn"
                      onClick={() => removeFromCart(idx)}
                      title="Remove item"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '50px', marginBottom: '20px' }}>🛒</div>
                <div style={{ fontWeight: 600, color: '#64748b' }}>Your cart is empty</div>
                <div style={{ color: '#94a3b8', marginTop: '10px' }}>
                  Add items from the menu
                </div>
              </div>
            )}
          </div>

          <hr style={{ margin: '20px 0', border: 0, borderTop: '1px solid #e2e8f0' }} />

          <div className="cart-total-row">
            <span>Total:</span>
            <span>₹<span>{cartTotal}</span></span>
          </div>

          <button
            className="btn btn-success"
            onClick={handleCheckout}
            disabled={cart.length === 0 || processing}
            style={{ width: '100%', marginTop: '25px', padding: '16px' }}
          >
            {processing ? (
              <span><span>⏳</span> Processing...</span>
            ) : (
              <span><span>✅</span> Place Order</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
