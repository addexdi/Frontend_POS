import { ReactNode, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaHome, FaCashRegister, FaBox, FaShoppingCart, FaTruck, FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'POS System' }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [purchasesOpen, setPurchasesOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Point of Sale System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/ICON.svg" />
      </Head>

      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:static lg:translate-x-0 z-30 w-64 h-full bg-dark transition-transform duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Link href="/" className="flex items-center">
              <img src="/img/BABS-SOLUTIONS.svg" alt="Logo" className="h-8" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-primary rounded-lg transition-colors"
                >
                  <FaHome size={18} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pos"
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-primary rounded-lg transition-colors"
                >
                  <FaCashRegister size={18} />
                  <span>POS</span>
                </Link>
              </li>
              
              {/* Products submenu */}
              <li>
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-primary rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FaBox size={18} />
                    <span>Products</span>
                  </div>
                  <FaChevronDown
                    size={14}
                    className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {productsOpen && (
                  <ul className="ml-4 mt-2 space-y-1">
                    <li>
                      <Link
                        href="/products"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                      >
                        Product List
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/products/add"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                      >
                        Add Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                      >
                        Category List
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/add"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                      >
                        Add Category
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Sales submenu */}
              <li>
                <button
                  onClick={() => setSalesOpen(!salesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-primary rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FaShoppingCart size={18} />
                    <span>Sales</span>
                  </div>
                  <FaChevronDown
                    size={14}
                    className={`transition-transform ${salesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {salesOpen && (
                  <ul className="ml-4 mt-2 space-y-1">
                    <li>
                      <Link
                        href="/sales"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                      >
                        Sales List
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/sales/add"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                      >
                        Add Sale
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Purchases submenu */}
              <li>
                <button
                  onClick={() => setPurchasesOpen(!purchasesOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-primary rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FaTruck size={18} />
                    <span>Purchase</span>
                  </div>
                  <FaChevronDown
                    size={14}
                    className={`transition-transform ${purchasesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {purchasesOpen && (
                  <ul className="ml-4 mt-2 space-y-1">
                    <li>
                      <Link
                        href="/purchases"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                      >
                        Purchase List
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/purchases/add"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                      >
                        Add Purchase
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between px-4 py-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <FaBars size={24} />
              </button>
              
              <div className="flex items-center gap-4 ml-auto">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <FaUser size={18} />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                >
                  Logout
                </Link>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
