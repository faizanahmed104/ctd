'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
// import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <Provider store={store}>

      {children}
    </Provider>
  );
}
