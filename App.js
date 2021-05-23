import { WebView } from 'react-native-webview';
import React from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://beban-barber-shop-2.de' }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator />}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
