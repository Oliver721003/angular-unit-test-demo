import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService],
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('當總計為 1000 (單價 100 元, 數量為 10 個), 售價應為 900', () => {
    const actual = service.compute(100, 10);
    expect(actual).toBe(900);
  });

  it('當總計為 500 (單價 100 元, 數量為 5 個), 售價應為 500', () => {
    const actual = service.compute(100, 5);
    expect(actual).toBe(500);
  });
});
