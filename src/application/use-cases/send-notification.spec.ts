import { randomUUID } from 'crypto';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification use case', () => {
    it('should be able to send notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const sendNotification = new SendNotification(notificationsRepository);

        const { notification } = await sendNotification.execute({
            category: 'Social',
            content: 'This is a notification',
            recipientId: randomUUID(),
        });

        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    });
});
