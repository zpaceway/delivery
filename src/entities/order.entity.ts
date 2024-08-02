import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
@Entity()
export class Order {
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

  private distanceDelivery = [
    [1, 1],
    [5, 3],
    [10, 8],
    [15, 15],
    [20, 25],
  ];

  getDelivery() {
    for (const [distanceKm, deliveryDollars] of this.distanceDelivery) {
      if (this.distance < distanceKm) {
        return deliveryDollars;
      }
    }

    return null;
  }

  calculateDelivery() {
    const delivery = this.getDelivery();
    if (delivery === null) {
      throw new Error('Unprocessable entry');
    }

    this.delivery = delivery;
  }
}
