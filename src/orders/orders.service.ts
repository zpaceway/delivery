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
   ) { }

   async processOrder(processOrderDto: ProcessOrderDto) {


      let delivery = 0;

      if (processOrderDto.distance < 1) {
         delivery = 1;
      } else if (processOrderDto.distance < 3) {
         delivery = 3;
      }
      else if (processOrderDto.distance < 8) {
         delivery = 8;
      }
      else if (processOrderDto.distance < 15) {
         delivery = 15;
      }
      else if (processOrderDto.distance < 25) {
         delivery = 25;
      } else {
         throw new Error('Unprocessable entry');
      }

      // registrar

      const orderDataForInsert = {
         id: '92ac5c8e-15cb-4cf2-b0ac-f633baeb711e',
         userId: processOrderDto.userId,
         value: processOrderDto.value,
         distance: processOrderDto.distance,
         delivery: delivery
      };      

      let order = this.orderRepository.create(orderDataForInsert);
      await this.orderRepository.save(order);

      if (!order) {
         throw new Error('Unprocessable entry');
      }

      console.log("Order create with id: " + order.id);

      return order;

   }


   getOrderById(orderId: string) {
      return this.orderRepository.findOneBy({ id: orderId });
   }

}
