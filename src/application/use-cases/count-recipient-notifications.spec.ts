import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'crypto';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipient notification use case', () => {
  it('should be able to CountRecipient a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    const recipientId = randomUUID();

    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'Social',
      recipientId: recipientId,
    });

    notificationsRepository.create(
      new Notification({
        content: new Content('Nova solicitação de amizade'),
        category: 'Social',
        recipientId: 'random-id',
      }),
    );

    notificationsRepository.create(notification);

    const { count } = await countRecipientNotification.execute({ recipientId });

    expect(count).toBe(1);
  });
});
