import React from 'react';
import { WebView } from 'react-native-webview';

export default function App() {
  const uri = 'https://beban-barber-shop-2.de/';

  return (
    <>
      <WebView source={{ uri }} />
    </>
  );
}
