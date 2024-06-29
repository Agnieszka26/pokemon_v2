'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { useApp } from './components/useApp';
import { ReactNode } from 'react';
const inter = Inter({ subsets: ['latin'] });

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

function GraphQLProvider({ children }: {children: ReactNode}) {
  const app = useApp();
  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:4000/',
      // We get the latest access token on each request
      fetch: async (uri, options) => {
        // const accessToken = app.currentUser?.accessToken;
        // options.headers.Authorization = `Bearer ${accessToken}`;
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = useApp();
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      // We get the latest access token on each request
      fetch: async (uri, options) => {
        // const accessToken = app.currentUser?.accessToken;
        // options.headers.Authorization = `Bearer ${accessToken}`;
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ApolloProvider>
  );
}
