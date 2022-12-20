import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'Social',
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });
});
