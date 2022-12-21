import { makeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'crypto';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Get recipient notification use case', () => {
  it('should be able to GetRecipient a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotification(
      notificationsRepository,
    );

    const recipientId = randomUUID();

    notificationsRepository.create(
      makeNotification({ recipientId: recipientId }),
    );

    notificationsRepository.create(
      makeNotification({ recipientId: recipientId }),
    );

    notificationsRepository.create(
      makeNotification({ recipientId: 'another-recipient-id' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipientId }),
        expect.objectContaining({ recipientId: recipientId }),
      ]),
    );
  });
});
