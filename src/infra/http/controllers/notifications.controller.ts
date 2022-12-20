import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    console.log('a');

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return { notification };
  }
}
