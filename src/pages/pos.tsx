import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db, Product, SaleItem } from '@/lib/localStorage';
import { FaImage, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Point of Sale</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No products found</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200"
                  >
                    <div className="aspect-square mb-3 flex items-center justify-center overflow-hidden rounded-md bg-gray-100">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <FaImage className="text-gray-400 text-4xl" />
                      )}
                    </div>
                    <div>
                      <h6 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h6>
                      <p className="text-lg font-bold text-primary mb-1">${product.price.toFixed(2)}</p>
                      <small className="text-xs text-gray-500">Stock: {product.quantity}</small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md sticky top-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Cart</h4>
            </div>
            <div className="p-6">
              <div className="max-h-96 overflow-y-auto mb-4">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-0">
                      <div className="flex-1 min-w-0">
                        <h6 className="text-sm font-semibold text-gray-800 truncate">{item.productName}</h6>
                        <p className="text-xs text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        >
                          <FaPlus size={12} />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded transition-colors ml-1"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                      <div className="font-bold text-primary text-sm">
                        ${item.total.toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <>
                  <div className="border-t-2 border-gray-200 pt-4 mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (10%):</span>
                      <span className="font-medium">${getTax().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mt-2">
                      <span>Total:</span>
                      <span className="text-primary">${getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
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
