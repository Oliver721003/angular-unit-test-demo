import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from './model/product';

import { ShoppingCarService } from './shopping-car.service';

describe('ShoppingCarService', () => {
  let service: ShoppingCarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ShoppingCarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('取得產品清單 (getProducts)', () => {
    service
      .getProducts()
      .subscribe((products) =>
        expect(products).toEqual([
          new Product('product1'),
          new Product('product2'),
        ])
      );

    const request = httpMock.expectOne('http://localhost:3000/products');
    expect(request.request.method).toBe('GET');
    request.flush([{ name: 'product1' }, { name: 'product2' }]);
  });

  it('儲存', () => {
    service.save('product1').subscribe();

    const request = httpMock.expectOne('http://localhost:3000/products');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ name: 'product1' });
    request.flush({ name: 'product1' });
  });
});
