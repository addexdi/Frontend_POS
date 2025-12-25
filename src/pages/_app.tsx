import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';
import { db } from '@/lib/localStorage';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize database on client side
    db.initialize();
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/dataTables.bootstrap4.min.css" />
        <link rel="stylesheet" href="/css/fontawesome.min.css" />
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
