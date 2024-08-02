import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessOrderDto } from '../dto';
import { Order } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  DATOS = [
    { km: 1, cash: 1 },
    { km: 5, cash: 3 },
    { km: 10, cash: 8 },
    { km: 15, cash: 15 },
    { km: 20, cash: 25 },
  ];
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  calcularValor = (distance) => {
    const valor = this.DATOS.find((item) => {
      return distance < item.km;
    });
    if (valor) {
      return valor;
    } else {
      throw new Error('Unprocessable entry');
    }
  };

  async processOrder(processOrderDto: ProcessOrderDto) {
    const { orderId, distance, userId, value } = processOrderDto;
    const delivery = this.calcularValor(distance);

    const order = this.orderRepository.create({
      id: orderId,
      userId: userId,
      value: value,
      distance: distance,
    });

    await this.orderRepository.insert({
      ...order,
      delivery: delivery.cash,
    });

    return {
      ...order,
      delivery: delivery.cash,
    };
  }
}
