import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Order } from './order';
import { IProduct } from '../products/product';

@Injectable()
export class OrderService {
  private apiUrl = this.baseUrl + 'api/orders';
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(this.apiUrl + '/' + orderId);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(this.apiUrl + '/' + order.orderId, order);
  }

  deleteOrder(orderId: string): Observable<Order> {
    return this.http.delete<Order>(this.apiUrl + '/' + orderId);
  }
}
