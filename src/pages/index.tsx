import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db, Product, Sale, Category } from '@/lib/localStorage';

export default function Home() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [recentSales, setRecentSales] = useState<Sale[]>([]);

  useEffect(() => {
    // Load statistics
    const products = db.getProducts();
    const categories = db.getCategories();
    const sales = db.getSales();
    
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    
    setStats({
      totalProducts: products.length,
      totalCategories: categories.length,
      totalSales: sales.length,
      totalRevenue,
    });

    // Load recent sales (last 5)
    const sortedSales = [...sales].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setRecentSales(sortedSales.slice(0, 5));
  }, []);

  return (
    <Layout title="Dashboard - POS System">
      <div className="page-header">
        <div className="page-title">
          <h4>Dashboard</h4>
          <h6>Manage your store</h6>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="dash-widget">
            <div className="dash-widgetimg">
              <span><i className="fas fa-box"></i></span>
            </div>
            <div className="dash-widgetcontent">
              <h5>${stats.totalRevenue.toFixed(2)}</h5>
              <h6>Total Revenue</h6>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="dash-widget dash1">
            <div className="dash-widgetimg">
              <span><i className="fas fa-shopping-cart"></i></span>
            </div>
            <div className="dash-widgetcontent">
              <h5>{stats.totalSales}</h5>
              <h6>Total Sales</h6>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6 col-12">
          <div className="dash-widget dash2">
            <div className="dash-widgetimg">
              <span><i className="fas fa-cubes"></i></span>
            </div>
            <div className="dash-widgetcontent">
              <h5>{stats.totalProducts}</h5>
              <h6>Total Products</h6>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-sm-6 col-12">
          <div className="dash-widget dash3">
            <div className="dash-widgetimg">
              <span><i className="fas fa-folder"></i></span>
            </div>
            <div className="dash-widgetcontent">
              <h5>{stats.totalCategories}</h5>
              <h6>Total Categories</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-sm-12 col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Recent Sales</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sale ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSales.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center">No sales yet</td>
                      </tr>
                    ) : (
                      recentSales.map((sale) => (
                        <tr key={sale.id}>
                          <td>#{sale.id}</td>
                          <td>{sale.customerName || 'Walk-in Customer'}</td>
                          <td>{new Date(sale.date).toLocaleDateString()}</td>
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
        </div>
      </div>
    </Layout>
  );
}
