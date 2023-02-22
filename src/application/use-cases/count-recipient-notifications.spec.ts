import { makeNotification } from '@test/factories/NotificationFactory';
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

        notificationsRepository.create(
            makeNotification({ recipientId: recipientId }),
        );

        notificationsRepository.create(
            makeNotification({ recipientId: 'another-recipient-id' }),
        );

        const { count } = await countRecipientNotification.execute({
            recipientId,
        });

        expect(count).toBe(1);
    });
});
