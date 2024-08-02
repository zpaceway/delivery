import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessOrderDto } from '../dto';
import { Order } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async procesaOrden(processOrderDto: ProcessOrderDto) {
    const order = this.orderRepository.create({
      id: processOrderDto.orderId,
      userId: processOrderDto.userId,
      value: processOrderDto.value,
      distance: processOrderDto.distance,
    });

    order.calCostoDelivery();

    await this.orderRepository.insert(order);

    return {
      id: processOrderDto.orderId,
      userId: processOrderDto.userId,
      value: processOrderDto.value,
      distance: processOrderDto.distance,
      delivery: order.delivery,
    };
  }
}