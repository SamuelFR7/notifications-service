import { ServerKafka } from '@nestjs/microservices';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class KafkaConsumerService
    extends ServerKafka
    implements OnModuleDestroy
{
    constructor() {
        super({
            client: {
                clientId: process.env.KAFKA_CLIENTID,
                brokers: [`${process.env.KAFKA_BROKER}`],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: `${process.env.KAFKA_USERNAME}`,
                    password: `${process.env.KAFKA_PASSWORD}`,
                },
                ssl: true,
            },
        });
    }

    async onModuleDestroy() {
        await this.close();
    }
}
