import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, toArray } from 'rxjs';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCarService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('http://localhost:3000/products')
      .pipe(
        mergeMap((product) => product),
        map(({ name }) => new Product(name)),
        toArray()
      );
  }

  save(name: string): Observable<Product> {
    return this.httpClient.post<Product>('http://localhost:3000/products', {
      name,
    });
  }
}
