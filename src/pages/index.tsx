import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db, Product, Sale, Category } from '@/lib/localStorage';
import { FaBox, FaShoppingCart, FaCubes, FaFolder } from 'react-icons/fa';

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Manage your store</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toFixed(2)}</h5>
              <h6 className="text-sm text-gray-600 mt-1">Total Revenue</h6>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FaBox className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-2xl font-bold text-gray-800">{stats.totalSales}</h5>
              <h6 className="text-sm text-gray-600 mt-1">Total Sales</h6>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FaShoppingCart className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-2xl font-bold text-gray-800">{stats.totalProducts}</h5>
              <h6 className="text-sm text-gray-600 mt-1">Total Products</h6>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FaCubes className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-2xl font-bold text-gray-800">{stats.totalCategories}</h5>
              <h6 className="text-sm text-gray-600 mt-1">Total Categories</h6>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <FaFolder className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800">Recent Sales</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSales.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No sales yet</td>
                </tr>
              ) : (
                recentSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{sale.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.customerName || 'Walk-in Customer'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sale.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
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
    </Layout>
  );
}
