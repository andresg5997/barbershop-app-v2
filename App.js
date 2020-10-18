import React from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import { salonUrl } from './imports';

export default function App() {
  return (
    <WebView
      source={{ uri: salonUrl }}
      startInLoadingState
      renderLoading={() => <ActivityIndicator />}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }}
    />
  );
}
