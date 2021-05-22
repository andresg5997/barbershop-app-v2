import { Notification } from "./Notification";

interface PushNotificationData {
  firstNotification: Omit<Notification, 'remainingMinutes'>; 
  nextNotifications: Notification[];
}

export type { PushNotificationData };