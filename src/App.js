import React from 'react';
import { AuctionBody } from './components/auctions/AuctionBody';
import { NavComps } from './components/authentication/NavComps';
import { AuthProvider } from './context/AuthContext';

export const App = () => {
  return (
    <AuthProvider>
    <NavComps />
    <AuctionBody />
    </AuthProvider>
  );
};
