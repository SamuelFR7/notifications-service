import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const kafka = new Kafka({
    brokers: [`${process.env.KAFKA_BROKER}`],
    sasl: {
      mechanism: 'scram-sha-256',
      username: `${process.env.KAFKA_USERNAME}`,
      password: `${process.env.KAFKA_PASSWORD}`,
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade',
          category: 'Social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
