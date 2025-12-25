import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { db } from '@/lib/localStorage';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize database on client side
    db.initialize();
  }, []);

  return <Component {...pageProps} />;
}
