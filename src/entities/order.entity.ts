import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
export class Order {
  private kmdollar = [
    [1, 1],
    [5, 3],
    [10, 8],
    [15, 15],
    [20, 25],
  ];
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

  getDelivery() {
    for (const [km, dollar] of this.kmdollar) {
      if (this.distance < km) {
        return dollar;
      }
    }
    return null;
  }
  calculateDelivery() {
    const delivery = this.getDelivery();
    if (!delivery) {
      throw new Error('Unprocessable entry');
    }
    this.delivery = delivery;
  }
}
