import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
export class Order {
  
  private distanceInKmDeliveryInDollarsMapping = [
    [1, 1],
    [5, 3],
    [10, 8],
    [15, 15],
    [20, 25],
  ]

  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  userId: string;

  @Column('float')
  value: number;

  @Column('float')
  distance: number;

  @Column('float')
  delivery: number;
}
