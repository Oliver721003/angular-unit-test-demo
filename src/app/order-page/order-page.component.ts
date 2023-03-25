import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent {
  title = '訂單頁面';

  total = 0;

  unitPrice = 10;

  constructor(private orderService: OrderService) {}

  onCompute(quantity: number): void {
    this.total = this.orderService.compute(this.unitPrice, quantity);
  }
}
