import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { ProcessOrderDto } from '../dto';
import { Order } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';
import { OrdersModule } from './orders.module';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<Order>;
  let module: TestingModule;
  const testUserId = '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3323';

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
      imports: [AppModule, OrdersModule],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  afterEach(async () => {
    // Clean up the orders created during the test
    await repository.clear();
  });

  // Ensure proper teardown
  afterAll(async () => {
    await module.close(); // Close the testing module to release resources
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should throw an error for distance greater than 20 km', async () => {
    const testOrderId = '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3312';
    const processOrderDto: ProcessOrderDto = {
      orderId: testOrderId,
      userId: testUserId,
      value: 100,
      distance: 25,
    };

    await expect(service.procesaOrden(processOrderDto)).rejects.toThrow(
      'Unprocessable entry',
    );
  });

  it.each([
    {
      distance: 0.5,
      expectedDelivery: 1,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3381',
    },
    {
      distance: 3,
      expectedDelivery: 3,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3382',
    },
    {
      distance: 7,
      expectedDelivery: 8,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3383',
    },
    {
      distance: 12,
      expectedDelivery: 15,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3384',
    },
    {
      distance: 19,
      expectedDelivery: 25,
      orderId: '1b3d4a4c-ee46-4d1c-b9a5-bf13196c3385',
    },
  ])(
    'should calculate delivery correctly for distance $distance km',
    async ({ distance, expectedDelivery, orderId }) => {
      const processOrderDto: ProcessOrderDto = {
        orderId: orderId,
        userId: testUserId,
        value: 100,
        distance: distance,
      };

      const result = await service.procesaOrden(processOrderDto);

      expect(result.delivery).toBe(expectedDelivery);
    },
  );
});
