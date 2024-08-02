import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
export class Order {

  private distanciaDeleveryCosto = [
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
    for (const [disEntrega, costoDelivery] of this.distanciaDeleveryCosto) {
      if (this.distance < disEntrega) {
        return costoDelivery;
      }
    }

    return null;
  }

  calCostoDelivery() {
    const delivery = this.getDelivery();
    if (delivery === null) {
      throw new Error('Unprocessable entry');
    }

    this.delivery = delivery;
  }
}
