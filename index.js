/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    if (notification.foreground) {
      PushNotification.localNotification({
        title: notification.title,
        message: notification.message,
      });
    }

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'barbershopapp-notification', // (required)
    channelName: 'Barbershopapp Notification Channel', // (required)
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => App);
