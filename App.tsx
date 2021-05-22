import {WebView, WebViewMessageEvent} from 'react-native-webview';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { PushNotificationData } from './src/types/PushNotificationData';

const injectedJS = `
window.addEventListener('PUSH_NOTIFICATION', function() {
  const res = localStorage.getItem('PUSH_NOTIFICATION')
  if(window.ReactNativeWebView)
    window.ReactNativeWebView.postMessage(res);
});true;`;

export default function App() {

  const runNotificationTimer = (e: WebViewMessageEvent) => {
    for (let index = 0; index < 7; index++) {
      setTimeout(() => {
          console.log(index);
      }, index * 1000);
    }

    setTimeout(() => {
      PushNotification.localNotification({
        title: 'dalyed title',
        message: 'dalyed message',
      });
  }, 7000);


    const { nativeEvent } = e;

    const form = JSON.parse(nativeEvent.data) as PushNotificationData;

    const { firstNotification, nextNotifications } = form;

    PushNotification.localNotificationSchedule({
      channelId: 'barbershopapp-notification',
      title: firstNotification.title,
      message: firstNotification.message,
      date: new Date(Date.now() + 1 * 1000),
    });

    PushNotification.localNotificationSchedule({
      channelId: 'barbershopapp-notification',
      title: 'new title',
      message: "new message",
      date: new Date(Date.now() + (7 * 1000)),
    });

    // nextNotifications.forEach((notification) => {
    //   PushNotification.localNotificationSchedule({
    //     channelId: 'barbershopapp-notification',
    //     title: notification.title,
    //     message: notification.message,
    //     date: new Date(Date.now() + (notification.remainingMinutes * 60) * 1000),
    //   });
    // });
  };

  return (
    <>
      <SafeAreaView style={styles.notchArea} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <WebView
          cacheMode={'LOAD_NO_CACHE'}
          cacheEnabled={false}
          injectedJavaScript={injectedJS}
          source={{uri: 'http://demosalon.hilgensoft.de/'}}
          startInLoadingState
          renderLoading={() => <ActivityIndicator />}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onMessage={runNotificationTimer}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  notchArea: {
    backgroundColor: '#111',
  },
});
