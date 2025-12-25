import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db, Sale } from '@/lib/localStorage';

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = () => {
    const allSales = db.getSales();
    // Sort by date descending
    const sortedSales = allSales.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setSales(sortedSales);
  };

  const filteredSales = sales.filter(sale =>
    sale.id.includes(searchTerm) ||
    (sale.customerName && sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout title="Sales - POS System">
      <div className="page-header">
        <div className="page-title">
          <h4>Sales List</h4>
          <h6>Manage your sales</h6>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-top">
            <div className="search-set">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search sales..."
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
                  <th>Sale ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Subtotal</th>
                  <th>Tax</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">No sales found</td>
                  </tr>
                ) : (
                  filteredSales.map((sale) => (
                    <tr key={sale.id}>
                      <td>#{sale.id}</td>
                      <td>{sale.customerName || 'Walk-in Customer'}</td>
                      <td>{new Date(sale.date).toLocaleDateString()}</td>
                      <td>{sale.items.length} item(s)</td>
                      <td>${sale.subtotal.toFixed(2)}</td>
                      <td>${sale.tax.toFixed(2)}</td>
                      <td>${sale.total.toFixed(2)}</td>
                      <td>
                        <span className={`badge badge-${
                          sale.status === 'completed' ? 'success' : 
                          sale.status === 'pending' ? 'warning' : 'danger'
                        }`}>
                          {sale.status}
                        </span>
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
