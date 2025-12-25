import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'POS System' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Point of Sale System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/ICON.svg" />
      </Head>

      <div className="main-wrapper">
        <div className="header">
          <div className="header-left active">
            <Link href="/" className="logo">
              <img src="/img/BABS-SOLUTIONS.svg" alt="Logo" />
            </Link>
            <Link href="/" className="logo-small">
              <img src="/img/ICON.svg" alt="Logo" />
            </Link>
          </div>

          <a id="mobile_btn" className="mobile_btn" href="#sidebar">
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>

          <ul className="nav user-menu">
            <li className="nav-item">
              <Link href="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/signin" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li>
                  <Link href="/">
                    <i className="fas fa-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link href="/pos">
                    <i className="fas fa-cash-register"></i> <span>POS</span>
                  </Link>
                </li>
                <li className="submenu">
                  <a href="#"><i className="fas fa-box"></i> <span>Products</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link href="/products">Product List</Link></li>
                    <li><Link href="/products/add">Add Product</Link></li>
                    <li><Link href="/categories">Category List</Link></li>
                    <li><Link href="/categories/add">Add Category</Link></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#"><i className="fas fa-shopping-cart"></i> <span>Sales</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link href="/sales">Sales List</Link></li>
                    <li><Link href="/sales/add">Add Sale</Link></li>
                  </ul>
                </li>
                <li className="submenu">
                  <a href="#"><i className="fas fa-truck"></i> <span>Purchase</span> <span className="menu-arrow"></span></a>
                  <ul>
                    <li><Link href="/purchases">Purchase List</Link></li>
                    <li><Link href="/purchases/add">Add Purchase</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="page-wrapper">
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
