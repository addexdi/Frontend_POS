import { useState, FormEvent } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { db } from '@/lib/localStorage';

export default function AddCategory() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    db.addCategory({
      name: formData.name,
      code: formData.code,
      description: formData.description,
    });

    router.push('/categories');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout title="Add Category - POS System">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Category</h1>
        <p className="text-gray-600">Create new category</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Code</label>
              <input
                type="text"
                name="code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                onClick={() => router.push('/categories')}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
