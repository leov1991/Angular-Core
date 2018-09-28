import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';

@Injectable()
export class ProductsService {
  private apiUrl = this.baseUrl + 'api/products';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  getProductById(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(this.apiUrl + '/' + productId);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(this.apiUrl + '/' + product.id, product);
  }

  deleteProduct(productId: string): Observable<IProduct> {
    return this.http.delete<IProduct>(this.apiUrl + '/' + productId);
  }
}
