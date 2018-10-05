import * as _ from 'lodash';
export class Order {
  orderId: number;
  orderDate: Date = new Date();
  orderNumber: number;
  items: Array<OrderItem> = new Array<OrderItem>();
  subtotal: number;

  getSubtotal(): number {
    return _.sum(_.map(this.items, i => i.unitPrice * i.quantity));
  };
}

export class OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  productId: number;
  productName: string;
  productImageThumbnailUrl: string
}
