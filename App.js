import { WebView } from 'react-native-webview';
import React from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView, Text } from 'react-native';
import PushNotification, { PushNotificationObject } from 'react-native-push-notification';
const injectedJS = `
window.addEventListener('sendData', function() {
  const res = localStorage.getItem('PUSH_NOTIFICATION')
  if(window.ReactNativeWebView)
    window.ReactNativeWebView.postMessage(res);
});true;`

export default function App() {
  
  const runNotificationTimer = (e) => {

    setTimeout(() => {
      PushNotification.getScheduledLocalNotifications((data) => {
        console.log(JSON.stringify(data))
      });
    }, 2500);
    
    const { nativeEvent } = e;
    console.log("🚀 ~ file: App.js ~ line 23 ~ runNotificationTimer ~ nativeEvent", nativeEvent)

    const form = JSON.parse(nativeEvent.data);

    const {
      remainingMinutes,
      form: {
        date,
        time,
        stylistName
      }
    } = form;

    console.log("🚀 ~ file: App.js ~ line 31 ~ runNotificationTimer ~ form", form)

    PushNotification.localNotificationSchedule({
      channelId: "your-great-notification",
      message: `Sie gerade haben ein Termin gebucht mit ${stylistName} um ${time} am ${date}`,
      date: new Date(Date.now() + 1 * 1000), 
    })

    // Two hours reminder
    if(remainingMinutes > (60 * 2)) {
      PushNotification.localNotificationSchedule({
        channelId: "your-great-notification",
        message: `Sie haben ein Termin mit ${stylistName} um ${time} am ${date}`,
        date: new Date(Date.now() + ((remainingMinutes - (60 * 2)) * 60) * 1000), 
      })
    }

    // 24 hours reminder
    if(remainingMinutes > (60 * 24)) {
      PushNotification.localNotificationSchedule({
        channelId: "your-great-notification",
        message: `Sie haben ein Termin mit ${stylistName} um ${time} am ${date}`,
        date: new Date(Date.now() + ((remainingMinutes - (60 * 24)) * 60) * 1000), 
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        injectedJavaScript={ injectedJS }
        source={{ uri: 'http://10.0.2.2:9000/' }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator />}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onMessage={runNotificationTimer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
