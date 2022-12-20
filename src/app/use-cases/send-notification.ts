import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    req: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, category, content } = req;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}