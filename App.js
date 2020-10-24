import { WebView } from 'react-native-webview';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native';

export default function App() {
  return (
    <Text>Test</Text>
    // <WebView
    //   source={{ uri: 'https://beban-barber-shop-2.de' }}
    //   startInLoadingState
    //   renderLoading={() => <ActivityIndicator />}
    //   onError={(syntheticEvent) => {
    //     const { nativeEvent } = syntheticEvent;
    //     console.warn('WebView error: ', nativeEvent);
    //   }}
    // />
  );
}
