import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {
  compute(unitPrice: number, quantity: number): number {
    const total = unitPrice * quantity;
    return total >= 1000 ? total * 0.9 : total;
  }
}
