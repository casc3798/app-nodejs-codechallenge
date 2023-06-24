import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class KafkaService {
  private kafkaProducer: Producer;

  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientProxy,
  ) {}

  async emitEvent(eventName: string, data: any): Promise<void> {
    await lastValueFrom(this.kafkaClient.emit(eventName, data));
  }
}
