import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db, Product, SaleItem } from '@/lib/localStorage';

export default function POS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const allProducts = db.getProducts();
    setProducts(allProducts);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      const newItem: SaleItem = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        total: product.price,
      };
      setCart([...cart, newItem]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item =>
      item.productId === productId
        ? { ...item, quantity, total: quantity * item.price }
        : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.1; // 10% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const sale = {
      date: new Date().toISOString(),
      items: cart,
      subtotal: getSubtotal(),
      tax: getTax(),
      total: getTotal(),
      status: 'completed' as const,
    };

    db.addSale(sale);
    setCart([]);
    loadProducts(); // Refresh products to show updated quantities
    alert('Sale completed successfully!');
  };

  return (
    <Layout title="POS - Point of Sale">
      <div className="page-header">
        <div className="page-title">
          <h4>Point of Sale</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="row">
                {filteredProducts.length === 0 ? (
                  <div className="col-12 text-center">
                    <p>No products found</p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="col-lg-3 col-sm-6 col-12">
                      <div className="product-card" onClick={() => addToCart(product)}>
                        <div className="product-img">
                          {product.image ? (
                            <img src={product.image} alt={product.name} />
                          ) : (
                            <div className="product-placeholder">
                              <i className="fas fa-image"></i>
                            </div>
                          )}
                        </div>
                        <div className="product-info">
                          <h6>{product.name}</h6>
                          <p>${product.price.toFixed(2)}</p>
                          <small>Stock: {product.quantity}</small>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Cart</h4>
            </div>
            <div className="card-body">
              <div className="cart-items">
                {cart.length === 0 ? (
                  <p className="text-center">Cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.productId} className="cart-item">
                      <div className="cart-item-info">
                        <h6>{item.productName}</h6>
                        <p>${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="cart-item-actions">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="btn btn-sm btn-secondary"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="btn btn-sm btn-secondary"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          className="btn btn-sm btn-danger ml-2"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                      <div className="cart-item-total">
                        ${item.total.toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <>
                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax (10%):</span>
                      <span>${getTax().toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span><strong>Total:</strong></span>
                      <span><strong>${getTotal().toFixed(2)}</strong></span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="btn btn-primary btn-block"
                  >
                    Complete Sale
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
