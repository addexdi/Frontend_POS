# Frontend_POS

A modern Point of Sale (POS) system built with Next.js and TypeScript, using browser local storage for data persistence.

## Features

- **Dashboard**: Overview of sales, products, and categories
- **POS Interface**: Easy-to-use point of sale for quick transactions
- **Product Management**: Add, edit, and manage products
- **Category Management**: Organize products with categories
- **Sales Tracking**: View and manage all sales transactions
- **Local Storage Database**: All data stored in browser local storage
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend & Backend**: Next.js 14
- **Language**: TypeScript
- **Database**: Browser Local Storage
- **Styling**: Tailwind CSS
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system

### Installation

1. Clone the repository:
```bash
git clone https://github.com/addexdi/Frontend_POS.git
cd Frontend_POS
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Default Credentials

- **Email**: admin@pos.com
- **Password**: admin123

## Project Structure

```
Frontend_POS/
├── src/
│   ├── components/       # React components
│   │   └── Layout.tsx   # Main layout component with sidebar
│   ├── lib/             # Utility libraries
│   │   └── localStorage.ts  # Local storage database
│   ├── pages/           # Next.js pages
│   │   ├── categories/  # Category pages
│   │   ├── products/    # Product pages
│   │   ├── sales/       # Sales pages
│   │   ├── _app.tsx     # App wrapper
│   │   ├── _document.tsx
│   │   ├── index.tsx    # Dashboard
│   │   ├── pos.tsx      # POS interface
│   │   └── signin.tsx   # Login page
│   └── styles/          # Global styles
│       └── globals.css  # Tailwind CSS imports
├── public/              # Static assets
│   ├── img/            # Images
│   └── js/             # JavaScript files
├── tailwind.config.js   # Tailwind configuration
└── package.json
```

## Local Storage Schema

Data is stored in the browser's localStorage with the following structure:

- **Products**: Product inventory with SKU, price, quantity
- **Categories**: Product categories
- **Sales**: Sales transactions with line items
- **Purchases**: Purchase orders (future feature)
- **Users**: User accounts and authentication

## Features Overview

### Dashboard
- View total revenue, sales count, product count, and category count
- See recent sales transactions
- Quick stats overview

### POS (Point of Sale)
- Search and add products to cart
- Adjust quantities
- Calculate tax (10%)
- Complete sales transactions
- Automatic inventory updates

### Product Management
- Add new products with details
- View all products in a searchable table
- Edit product information
- Delete products
- Organize by categories

### Category Management
- Create product categories
- View and manage categories
- Delete categories

### Sales Management
- View all sales transactions
- Filter and search sales
- See sale details including items, totals, and status

## Browser Compatibility

This application works in all modern browsers that support:
- ES6+ JavaScript
- Local Storage API
- CSS Grid and Flexbox

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

