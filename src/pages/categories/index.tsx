import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { db, Category } from '@/lib/localStorage';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const allCategories = db.getCategories();
    setCategories(allCategories);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      db.deleteCategory(id);
      loadCategories();
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Categories - POS System">
      <div className="page-header">
        <div className="page-title">
          <h4>Category List</h4>
          <h6>Manage your categories</h6>
        </div>
        <div className="page-btn">
          <Link href="/categories/add" className="btn btn-added">
            <i className="fas fa-plus"></i> Add Category
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
                  placeholder="Search categories..."
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
                  <th>Category Name</th>
                  <th>Category Code</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">No categories found</td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>{category.code}</td>
                      <td>{category.description || '-'}</td>
                      <td>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(category.id); }}>
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
