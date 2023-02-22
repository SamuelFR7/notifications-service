import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly sendNotification: SendNotification,
        private readonly cancelNotification: CancelNotification,
        private readonly readNotification: ReadNotification,
        private readonly unreadNotification: UnreadNotification,
        private readonly countRecipientNotifications: CountRecipientNotification,
        private readonly getRecipientNotifications: GetRecipientNotification,
    ) {}

    @Patch(':id/cancel')
    async cancel(@Param('id') id: string): Promise<void> {
        await this.cancelNotification.execute({
            notificationId: id,
        });
    }

    @Get('/count/from/:id')
    async countFromRecipient(
        @Param('id') id: string,
    ): Promise<{ count: number }> {
        const { count } = await this.countRecipientNotifications.execute({
            recipientId: id,
        });

        return {
            count,
        };
    }

    @Get('/from/:recipientId')
    async getFromRecipient(@Param('recipientId') recipientId: string) {
        const { notifications } = await this.getRecipientNotifications.execute({
            recipientId,
        });

        return {
            notifications: notifications.map(NotificationViewModel.toHTTP),
        };
    }

    @Patch(':id/read')
    async read(@Param('id') id: string): Promise<void> {
        await this.readNotification.execute({
            notificationId: id,
        });
    }

    @Patch(':id/unread')
    async unread(@Param('id') id: string): Promise<void> {
        await this.unreadNotification.execute({
            notificationId: id,
        });
    }

    @Post()
    async create(@Body() body: CreateNotificationBody) {
        const { content, category, recipientId } = body;

        const { notification } = await this.sendNotification.execute({
            category,
            content,
            recipientId,
        });

        return NotificationViewModel.toHTTP(notification);
    }
}
