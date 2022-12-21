import { Notification } from '@application/entities/notification';

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    return {
      content: notification.content,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
