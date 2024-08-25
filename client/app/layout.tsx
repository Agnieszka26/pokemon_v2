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
const uri = process.env.NEXT_PUBLIC_NODE_ENV ==="development"? 'http://localhost:5844/graphql' : 'https://pokemonv2-production.up.railway.app/graphql'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const client = new ApolloClient({
    link: new HttpLink({
      uri,

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
