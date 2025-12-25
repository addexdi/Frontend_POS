import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { db, Product } from '@/lib/localStorage';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const allProducts = db.getProducts();
    setProducts(allProducts);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      db.deleteProduct(id);
      loadProducts();
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Products - POS System">
      <div className="page-header">
        <div className="page-title">
          <h4>Product List</h4>
          <h6>Manage your products</h6>
        </div>
        <div className="page-btn">
          <Link href="/products/add" className="btn btn-added">
            <i className="fas fa-plus"></i> Add Product
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-top">
            <div className="search-set">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">No products found</td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="productimgname">
                          {product.image ? (
                            <img src={product.image} alt={product.name} />
                          ) : (
                            <div className="product-img-placeholder">
                              <i className="fas fa-image"></i>
                            </div>
                          )}
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>{product.sku}</td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <Link href={`/products/edit/${product.id}`} className="me-3">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(product.id); }}>
                          <i className="fas fa-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
