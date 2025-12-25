// Local Storage Database Utility
// This provides a simple key-value storage interface using browser's localStorage

export interface StorageData {
  products: Product[];
  categories: Category[];
  sales: Sale[];
  purchases: Purchase[];
  users: User[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  customerId?: string;
  customerName?: string;
  date: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Purchase {
  id: string;
  supplierId?: string;
  supplierName?: string;
  date: string;
  items: PurchaseItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface User {
  id: string;
  email: string;
  password: string; // In production, this should be hashed
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

class LocalStorageDB {
  private prefix = 'pos_';

  // Generic get method
  private getItem<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  }

  // Generic set method
  private setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  }

  // Initialize database with default data if empty
  initialize(): void {
    const products = this.getProducts();
    if (!products || products.length === 0) {
      this.setItem('products', []);
    }

    const categories = this.getCategories();
    if (!categories || categories.length === 0) {
      this.setItem('categories', []);
    }

    const sales = this.getSales();
    if (!sales || sales.length === 0) {
      this.setItem('sales', []);
    }

    const purchases = this.getPurchases();
    if (!purchases || purchases.length === 0) {
      this.setItem('purchases', []);
    }

    const users = this.getUsers();
    if (!users || users.length === 0) {
      // Create default admin user
      const defaultUser: User = {
        id: '1',
        email: 'admin@pos.com',
        password: 'admin123', // In production, hash this
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      this.setItem('users', [defaultUser]);
    }
  }

  // Product methods
  getProducts(): Product[] {
    return this.getItem<Product[]>('products') || [];
  }

  getProduct(id: string): Product | null {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.push(newProduct);
    this.setItem('products', products);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    products[index] = {
      ...products[index],
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    this.setItem('products', products);
    return products[index];
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) return false;
    
    this.setItem('products', filteredProducts);
    return true;
  }

  // Category methods
  getCategories(): Category[] {
    return this.getItem<Category[]>('categories') || [];
  }

  getCategory(id: string): Category | null {
    const categories = this.getCategories();
    return categories.find(c => c.id === id) || null;
  }

  addCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Category {
    const categories = this.getCategories();
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    categories.push(newCategory);
    this.setItem('categories', categories);
    return newCategory;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const categories = this.getCategories();
    const index = categories.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    categories[index] = {
      ...categories[index],
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    this.setItem('categories', categories);
    return categories[index];
  }

  deleteCategory(id: string): boolean {
    const categories = this.getCategories();
    const filteredCategories = categories.filter(c => c.id !== id);
    
    if (filteredCategories.length === categories.length) return false;
    
    this.setItem('categories', filteredCategories);
    return true;
  }

  // Sale methods
  getSales(): Sale[] {
    return this.getItem<Sale[]>('sales') || [];
  }

  getSale(id: string): Sale | null {
    const sales = this.getSales();
    return sales.find(s => s.id === id) || null;
  }

  addSale(sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>): Sale {
    const sales = this.getSales();
    const newSale: Sale = {
      ...sale,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    sales.push(newSale);
    this.setItem('sales', sales);
    
    // Update product quantities
    newSale.items.forEach(item => {
      const product = this.getProduct(item.productId);
      if (product) {
        this.updateProduct(item.productId, {
          quantity: product.quantity - item.quantity
        });
      }
    });
    
    return newSale;
  }

  updateSale(id: string, updates: Partial<Sale>): Sale | null {
    const sales = this.getSales();
    const index = sales.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    sales[index] = {
      ...sales[index],
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    this.setItem('sales', sales);
    return sales[index];
  }

  deleteSale(id: string): boolean {
    const sales = this.getSales();
    const filteredSales = sales.filter(s => s.id !== id);
    
    if (filteredSales.length === sales.length) return false;
    
    this.setItem('sales', filteredSales);
    return true;
  }

  // Purchase methods
  getPurchases(): Purchase[] {
    return this.getItem<Purchase[]>('purchases') || [];
  }

  getPurchase(id: string): Purchase | null {
    const purchases = this.getPurchases();
    return purchases.find(p => p.id === id) || null;
  }

  addPurchase(purchase: Omit<Purchase, 'id' | 'createdAt' | 'updatedAt'>): Purchase {
    const purchases = this.getPurchases();
    const newPurchase: Purchase = {
      ...purchase,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    purchases.push(newPurchase);
    this.setItem('purchases', purchases);
    
    // Update product quantities
    newPurchase.items.forEach(item => {
      const product = this.getProduct(item.productId);
      if (product) {
        this.updateProduct(item.productId, {
          quantity: product.quantity + item.quantity
        });
      }
    });
    
    return newPurchase;
  }

  updatePurchase(id: string, updates: Partial<Purchase>): Purchase | null {
    const purchases = this.getPurchases();
    const index = purchases.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    purchases[index] = {
      ...purchases[index],
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    this.setItem('purchases', purchases);
    return purchases[index];
  }

  deletePurchase(id: string): boolean {
    const purchases = this.getPurchases();
    const filteredPurchases = purchases.filter(p => p.id !== id);
    
    if (filteredPurchases.length === purchases.length) return false;
    
    this.setItem('purchases', filteredPurchases);
    return true;
  }

  // User methods
  getUsers(): User[] {
    return this.getItem<User[]>('users') || [];
  }

  getUser(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.email === email) || null;
  }

  addUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    this.setItem('users', users);
    return newUser;
  }

  // Clear all data
  clearAll(): void {
    if (typeof window === 'undefined') return;
    
    const keys = ['products', 'categories', 'sales', 'purchases', 'users'];
    keys.forEach(key => {
      localStorage.removeItem(this.prefix + key);
    });
  }
}

// Export singleton instance
export const db = new LocalStorageDB();
