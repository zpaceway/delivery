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
/*
  getDelivery(){
    for(const [km, dollar] of this.kmdollar){
      if(this.distance < km){
        return dollar;
      }
    }
  }

  calculateDelivery(){
    const delivery = this.getDelivery();
    if(!delivery){
      throw new Error ('No es posible esta entrada')
    }
    this.delivery = delivery;
  }*/
}
