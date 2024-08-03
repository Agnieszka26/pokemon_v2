'use client';

import { Inter } from 'next/font/google';
import './globals.css';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import cn from './utils/className';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:4000/',

      fetch: async (uri, options) => {
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body className={cn(inter.className)}>
          <div className='container mx-auto'>

          {children}
          </div>
          </body>
      </html>
    </ApolloProvider>
  );
}
