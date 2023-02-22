import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
    notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
    constructor(
        private readonly notificationsRepository: NotificationsRepository,
    ) {}

    async execute(
        req: ReadNotificationRequest,
    ): Promise<ReadNotificationResponse> {
        const { notificationId } = req;

        const notification = await this.notificationsRepository.findById(
            notificationId,
        );

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationsRepository.save(notification);
    }
}
